import type { NextFunction, Request, Response } from 'express';
import { AppError, AppErrorCodes } from './errors.js';
import { ApiErrorResponse } from './responses.js';
import logger from '@config/logger.js';

type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;

const catchError = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next); // Await the async function to catch errors.
    } catch (error) {
      next(error); // Pass error to GlobalErrorHandler.
    }
  };
};

const GlobalErrorHandler = (
  err: Error | AppError,
  _: Request,
  res: Response
) => {
  // Log the error in development or non-production environments
  if (process.env.NODE_ENV !== 'production') {
    logger.error(err.message, '\n\n', err.stack);
  }

  // If the error is not an instance of AppError, return a generic 500 error response
  if (!(err instanceof AppError)) {
    return new ApiErrorResponse(res, 500)
      .message('Something went wrong')
      .send();
  }

  // Handle different types of errors based on the appErrorCode
  switch (err.appErrorCode) {
    case AppErrorCodes.BAD_REQUEST:
      return new ApiErrorResponse(res, 400)
        .message(err.message || 'Bad request')
        .send();
    case AppErrorCodes.VALIDATION_ERROR:
      return new ApiErrorResponse(res, 400)
        .message(err.message || 'Validation failed')
        .send();
    case AppErrorCodes.UNAUTHORIZED:
      return new ApiErrorResponse(res, 401)
        .message(err.message || 'Unauthorized')
        .send();
    case AppErrorCodes.FORBIDDEN:
      return new ApiErrorResponse(res, 403)
        .message(err.message || 'Forbidden')
        .send();
    case AppErrorCodes.NOT_FOUND:
      return new ApiErrorResponse(res, 404)
        .message(err.message || 'Not found')
        .send();
    case AppErrorCodes.CONFLICT:
      return new ApiErrorResponse(res, 409)
        .message(err.message || 'Conflict')
        .send();
    default:
      return new ApiErrorResponse(res, 500)
        .message('Something went wrong')
        .send();
  }
};

export { GlobalErrorHandler, catchError };
