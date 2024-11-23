import express, { type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { catchError, GlobalErrorHandler } from '@lib/error-handler.js';
import { ApiErrorResponse, ApiResponse } from '@lib/responses.js';
import logger from '@config/logger.js';
import userRouter from '@routes/user.js';

const app = express();

/**
 * Middleware setup:
 * - Parses incoming JSON and URL-encoded payloads.
 * - Adds security headers using Helmet.
 * - Enables CORS (Cross-Origin Resource Sharing).
 * - Integrates Morgan for HTTP request logging with Winston as the backend logger.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');
app.use(
  morgan('dev', {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

/**
 * Health check route to verify the server is working.
 * @route GET /api/v1/ping
 * @returns {ApiResponse} A simple 'pong' message with a 200 status.
 */
const ping = catchError((_: Request, res: Response) => {
  return new ApiResponse(res, 200).message('alive').send();
});

// Define application routes.
app.get('/api/v1/ping', ping);
app.use('/api/v1/users', userRouter);

/**
 * Catch-all route for undefined endpoints.
 * @route All *
 * @returns {ApiErrorResponse} A 404 error response indicating resource not found.
 */
app.all('*', (_: Request, res: Response) => {
  return new ApiErrorResponse(res, 404).message('resource not found').send();
});

/**
 * Global error handler for handling errors caught by catchError in the application.
 */
app.use(GlobalErrorHandler);

export default app;
