import type { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@lib/responses.js';
import { catchError } from '@lib/error-handler.js';
import User from '@models/user.js';
import { AppError, AppErrorCodes } from '@/lib/errors.js';

/**
 * Handle user registration
 * @route POST /api/v1/register
 */
export const register = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    // Check for missing fields
    if (!username || !email || !password) {
      throw new AppError(AppErrorCodes.BAD_REQUEST, 'missing required fields');
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError(AppErrorCodes.CONFLICT, 'user already exists');
    }

    // Create new user
    const newUser = await User.create({ username, email, password });

    return new ApiResponse(res, 201)
      .message('user registered successfully')
      .data({
        email: newUser.email,
      })
      .send();
  }
);

export const login = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      throw new AppError(AppErrorCodes.BAD_REQUEST, 'missing required fields');
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
    }

    return new ApiResponse(res, 200)
      .message('user logged in successfully')
      .data({
        token: 'token',
      })
      .send();
  }
);
