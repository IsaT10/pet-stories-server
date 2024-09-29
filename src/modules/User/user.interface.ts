import { Model } from 'mongoose';

export type TUser = {
  name: string;
  password: string;
  email: string;
  passwordChangeAt?: Date;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
  role: 'admin' | 'user';
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
