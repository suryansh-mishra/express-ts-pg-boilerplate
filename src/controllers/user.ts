import type { Request, Response } from 'express';
import { ApiResponse } from '@lib/responses.js';
import { catchError } from '@lib/error-handler.js';
import { AppError, AppErrorCodes } from '@/lib/errors.js';
import userService from '@/services/user.js';

/**
 * Handle user registration
 * @route POST /api/v1/register
 */
export const register = catchError(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  // Check for missing fields
  if (!firstName || !lastName || !email || !password) {
    throw new AppError(AppErrorCodes.BAD_REQUEST, 'missing required fields');
  }

  // const existingUser = await User.findOne({ email });
  // if (existingUser) {
  //   throw new AppError(AppErrorCodes.CONFLICT, 'user already exists');
  // }
  const newUser = await userService.register({
    firstName,
    lastName,
    email,
    password,
  });

  return new ApiResponse(res, 201)
    .message('user registered successfully')
    .data(newUser)
    .send();
});

export const login = catchError(async (req: Request, res: Response) => {
  // const { email, password } = req.body;

  // Check for missing fields
  // if (!email || !password) {
  //   throw new AppError(AppErrorCodes.BAD_REQUEST, 'missing required fields');
  // }
  // const existingUser = await User.findOne({ email });
  // if (!existingUser) {
  //   console.log('User not in system');
  // }

  return new ApiResponse(res, 200)
    .message('user logged in successfully')
    .data({
      // token: 'token',
    })
    .send();
});
