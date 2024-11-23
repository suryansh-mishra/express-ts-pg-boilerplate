import { catchError } from '@lib/error-handler.js';
import { AppError, AppErrorCodes } from '@lib/errors.js';
import type { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

const validateReqBody = (schema: ZodSchema) => {
  return catchError((req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (_) {
      throw new AppError(AppErrorCodes.BAD_REQUEST, 'invalid request body');
    }
  });
};

export default validateReqBody;
