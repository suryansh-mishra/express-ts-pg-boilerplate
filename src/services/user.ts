import db from '@/config/database.js';
import { BCRYPT_HASH_ROUNDS } from '@/const.js';
import { userAuthTable, usersTable } from '@/db/schema/user.js';
import { bubbleError } from '@lib/error-handler.js';
import bcrypt from 'bcrypt';

interface NewUserData {
  firstName: string;
  lastName: string;
  email?: string;
  password: string;
  mobileNumber?: string;
}

const register = bubbleError(async (data: NewUserData) => {
  type NewUser = typeof usersTable.$inferInsert;
  const { firstName, lastName, email, password, mobileNumber } = data;

  const hashedPassword = await bcrypt.hash(password, BCRYPT_HASH_ROUNDS);

  const user = {
    firstName: firstName,
    lastName: lastName,
  } as NewUser;

  if (email) user.email = email;
  if (mobileNumber) user.mobileNumber = mobileNumber;

  type NewUserAuth = typeof userAuthTable.$inferInsert;

  const userAuth = { password: hashedPassword } as NewUserAuth;

  await db.transaction(async (tx) => {
    // 1. User creation
    const insertedUser = await tx
      .insert(usersTable)
      .values(user as NewUser)
      .returning();
    // 2. Auth information creation
    userAuth.userId = insertedUser[0].id;
    user.id = insertedUser[0].id;
    await tx.insert(userAuthTable).values(userAuth as NewUserAuth);
  });

  return user;
});

export default {
  register,
};
