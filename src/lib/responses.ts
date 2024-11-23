import type { Response } from 'express';

export enum ResponseStatus {
  Success = 'success',
  Fail = 'fail',
  Error = 'error',
}

// Define a base API response with conditional support for `data`
class _BaseApiResponse<T = undefined> {
  private _response: Response;
  private _status: ResponseStatus = ResponseStatus.Success;
  private _message?: string;
  protected _data?: T;

  constructor(response: Response, statusCode: number) {
    this._response = response;
    this._response.statusCode = statusCode;
    this._status = this.evaluateStatus(statusCode);
  }

  // Sets a custom status type, if needed
  public statusType(status: ResponseStatus) {
    this._status = status;
    return this;
  }

  // Sets a message for the response
  public message(message: string) {
    this._message = message.toLowerCase(); // Ensure message is lowercase
    return this;
  }

  // Auto-evaluate the response status based on the HTTP status code
  private evaluateStatus(statusCode: number): ResponseStatus {
    if (statusCode >= 200 && statusCode < 300) return ResponseStatus.Success;
    if (statusCode >= 400 && statusCode < 500) return ResponseStatus.Fail;
    return ResponseStatus.Error;
  }

  // Finalize and send the response
  public send() {
    if (this._response.headersSent) return; // Prevent duplicate sends
    // eslint-disable-next-line
    const responseBody: Record<string, any> = { status: this._status };
    if (this._message) responseBody['message'] = this._message || null;
    if (this._data !== undefined) responseBody['data'] = this._data;
    this._response.json(responseBody);
  }
}

// ApiResponse supports `data`
export class ApiResponse<T> extends _BaseApiResponse<T> {
  constructor(response: Response, statusCode: number) {
    super(response, statusCode);
  }
  public data(data: T) {
    this._data = data;
    return this;
  }
}

export class ApiErrorResponse<T> extends _BaseApiResponse<T> {
  constructor(response: Response, statusCode: number) {
    super(response, statusCode);
  }
}
