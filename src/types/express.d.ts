import { User } from './models/User'; // Import the User type (adjust path as needed)

declare global {
  namespace Express {
    interface Request {
      user?: Partial<User>; // Add the 'user' property, making it optional
    }
  }
}
