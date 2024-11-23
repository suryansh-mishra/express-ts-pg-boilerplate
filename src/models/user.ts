import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { BCRYPT_HASH_ROUNDS } from '../const.js';
import { UserRoles, type User as UserType } from '@/types/user.js';

export interface UserSchema extends UserType, Document {}

const UserSchema = new Schema<UserSchema>(
  {
    role: {
      type: String,
      enum: [UserRoles.SUPERUSER, UserRoles.ADMIN, UserRoles.USER],
      default: UserRoles.USER,
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isSubscribed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash the password before saving
UserSchema.pre<UserSchema>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, BCRYPT_HASH_ROUNDS);
  next();
});

// Compare passwords
UserSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model<UserType>('User', UserSchema);

export default User;
