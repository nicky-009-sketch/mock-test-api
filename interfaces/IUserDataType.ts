import { Document } from 'mongoose';

export interface IUser extends Document {
  name?: string;
  email?: string;
  otp?: number
}

export interface IUserGenerateOtpPostDataType {
  email: string
}
export interface IUserLoginPostDataType {
  email: string;
  otp:number;
}