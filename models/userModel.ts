import mongoose, { Schema, Document } from 'mongoose';
import '../services/db';
import userSchema from '../schema/dbSchema/userSchema';
import { IUser } from '../interfaces/IUserDataType';
const UserModel = mongoose.model<IUser>('ab_users', userSchema);

export class userModel {

 findOne = async (email: string): Promise <IUser | null> => {
  try {
   const user = await UserModel.findOne({ email }).exec();
   return user;
  } catch (error) {
   console.error('Error finding user by userId:', error);
   throw error;
  }
 };
 
}
