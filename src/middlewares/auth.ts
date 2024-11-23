import type { Request, Response, NextFunction } from 'express';
import { catchError } from '@lib/error-handler.js';
import { validate as validateJsonWebToken } from '@lib/jwt.js';
import { AppError, AppErrorCodes } from '@/lib/errors.js';
import User from '@models/user.js';
import { UserRoles } from '@/types/user.js';

/**
 * Basic Authentication Middleware
 * Verifies the `Authorization` header for valid credentials.
 */

export const authenticate = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const auth = validateJsonWebToken(req);
    req.user = { id: '', email: '' };
    req.user.id = auth.id;
    req.user.email = auth.email;
    next();
  }
);

export const isSuperuser = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(AppErrorCodes.UNAUTHORIZED);
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new AppError(AppErrorCodes.UNAUTHORIZED);
    }
    if (user.role !== UserRoles.SUPERUSER) {
      throw new AppError(AppErrorCodes.FORBIDDEN);
    }
    next();
  }
);

// export const basicAuthMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Basic ')) {
//     return new ApiErrorResponse(res, 401)
//       .message('Authorization header is missing or invalid')
//       .send();
//   }

//   const base64Credentials = authHeader.split(' ')[1];
//   const [email, password] = Buffer.from(base64Credentials, 'base64')
//     .toString()
//     .split(':');

//   if (!email || !password) {
//     return new ApiErrorResponse(res, 401).message('Invalid credentials').send();
//   }

//   const user = await User.findOne({ email });
//   if (!user || !(await user.comparePassword(password))) {
//     return new ApiErrorResponse(res, 401)
//       .message('Invalid email or password')
//       .send();
//   }

//   req.user = { id: user.id, email: user.email };
//   next();
// };
