import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
}

export interface IUserRegisterPostDataType{
  name: string;
  email: string;
}