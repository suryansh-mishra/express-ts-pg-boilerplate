import type { User, UserRoles } from './user';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      }; // Add the optional 'user' property
    }
  }
}
