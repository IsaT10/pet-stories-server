/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TUser = {
  name: string;
  password: string;
  image: string;
  email: string;
  passwordChangeAt?: Date;
  status: 'basic' | 'premium' | 'blocked';
  isDeleted: boolean;
  role: 'admin' | 'user';
  packageExpireAt: Date;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
};

export interface UserModel extends Model<TUser> {
  isValidUser: (id: string) => Promise<TUser>;
  isPasswordMatch: (
    plainPassword: string,
    hashPassword: string
  ) => Promise<boolean>;
  isJWTIssuedBeforePasswordChange: (
    changePasswordTimestamp: Date,
    jwtIssuedTimestamp: number
  ) => boolean;
}
