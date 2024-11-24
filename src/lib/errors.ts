enum AppErrorCodes {
  APP_ERROR = 'APP_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  INVALID_REQUEST = 'INVALID_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

class AppError extends Error {
  public appErrorCode: AppErrorCodes;

  constructor(errCode: AppErrorCodes, message?: string) {
    super(message || errCode);
    this.appErrorCode = errCode;
    Object.setPrototypeOf(this, new.target.prototype);
    // Error.captureStackTrace(this, this.constructor);
  }
}

export { AppError, AppErrorCodes };
