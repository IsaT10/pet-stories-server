import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import AppError from '../../error/appError';

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },

    status: {
      type: String,
      enum: ['basic', 'premium', 'blocked'],
      default: 'basic',
    },
    passwordChangeAt: Date,
    packageExpireAt: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  const user = this as TUser;

  const hashPassword = await bcrypt.hash(
    user.password,
    Number(process.env.SALT_ROUNDS)
  );

  user.password = hashPassword;

  next();
});

UserSchema.statics.isValidUser = async function (email: string) {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!');
  }

  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already blocked!');
  }

  return user;
};

UserSchema.statics.isPasswordMatch = async function (
  plainPassword: string,
  hashPassword: string
) {
  return await bcrypt.compare(plainPassword, hashPassword);
};

UserSchema.statics.isJWTIssuedBeforePasswordChange = function (
  changePasswordTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(changePasswordTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

UserSchema.pre('save', async function (next) {
  const isUserExist = await User.findOne({ email: this.email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, `User is already creaated.`);
  }

  next();
});

export const User = model<TUser, UserModel>('User', UserSchema);
