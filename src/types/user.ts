export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPERUSER = 'SUPERUSER',
}

export interface User {
  email: string;
  password: string;
  isVerified: boolean;
  isSubscribed: boolean;
  role: UserRoles;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
