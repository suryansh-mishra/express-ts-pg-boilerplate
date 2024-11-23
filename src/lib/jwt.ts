import type { Request } from 'express';
import jwt, { type JwtPayload, type Secret } from 'jsonwebtoken';
import { AppError, AppErrorCodes } from '@lib/errors.js';
import type { UserRoles } from '@/types/user.js';

/**
 * Signs a new JWT token with the provided payload.
 * @param id - User ID.
 * @param email - User email.
 * @returns The signed JWT token.
 */
const sign = (id: string, email: string): string => {
  const payload = { email, id };
  const secret = process.env.JWT_SECRET as Secret;
  const expiresIn = process.env.JWT_EXPIRES_IN;
  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Validates a JWT token from the request cookies.
 * @param req - Express request object.
 * @returns Decoded payload or an error object.
 */
const validate = (
  req: Request
): {
  id: string;
  email: string;
} => {
  const token = req.cookies?.jwt;
  if (!token) {
    throw new AppError(AppErrorCodes.UNAUTHORIZED, 'invalid token');
  }
  const secret = process.env.JWT_SECRET as Secret;
  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new AppError(AppErrorCodes.UNAUTHORIZED, 'invalid jwt');
  }

  // Check for token expiry
  if (decoded.exp && decoded.exp * 1000 < Date.now()) {
    throw new AppError(AppErrorCodes.UNAUTHORIZED, 'expired jwt token');
  }

  return { id: decoded.id, email: decoded.email };
};

export { sign, validate };
