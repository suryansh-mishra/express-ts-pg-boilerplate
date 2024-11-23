import type { NextFunction, Request, Response } from 'express';
import { AppErrorCodes } from './errors.js';
import { ApiErrorResponse } from './responses.js';
import logger from '@config/logger.js';

const catchError = (func: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next); // Await the async function to catch errors.
    } catch (error) {
      next(error); // Pass error to GlobalErrorHandler.
    }
  };
};

const GlobalErrorHandler = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV !== 'production') {
    logger.error(err, '\n\n');
  }

  if (!err.appErrorCode) {
    return new ApiErrorResponse(res, 500)
      .message('something went wrong')
      .send();
  }
  switch (err.appErrorCode) {
    case AppErrorCodes.BAD_REQUEST:
      return new ApiErrorResponse(res, 400)
        .message(err.message || 'bad request')
        .send();
    case AppErrorCodes.VALIDATION_ERROR:
      return new ApiErrorResponse(res, 400)
        .message(err.message || 'validation failed')
        .send();
    case AppErrorCodes.UNAUTHORIZED:
      return new ApiErrorResponse(res, 401)
        .message(err.message || 'unauthorized')
        .send();
    case AppErrorCodes.FORBIDDEN:
      return new ApiErrorResponse(res, 403)
        .message(err.message || 'forbidden')
        .send();
    case AppErrorCodes.NOT_FOUND:
      return new ApiErrorResponse(res, 404)
        .message(err.message || 'not found')
        .send();
    case AppErrorCodes.CONFLICT:
      return new ApiErrorResponse(res, 409)
        .message(err.message || 'conflict')
        .send();
    default:
      return new ApiErrorResponse(res, 500)
        .message('something went wrong')
        .send();
  }
};

export { GlobalErrorHandler, catchError };
