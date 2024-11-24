import {
  bigserial,
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isEmailVerified: boolean().default(false).notNull(),
  mobileNumber: varchar({ length: 255 }).unique(),
  isMobileNumberVerified: boolean().default(false).notNull(),
  is2FAEnabled: boolean().default(false).notNull(),
  avatarUrl: varchar({ length: 255 }),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const authTypes = pgEnum('auth_type', ['email', 'google', 'apple']);

export const userAuthTable = pgTable('user_auth', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  userId: bigserial({ mode: 'number' })
    .notNull()
    .references(() => usersTable.id),
  authType: authTypes().notNull(),
  password: varchar({ length: 255 }),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
