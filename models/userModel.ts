import mongoose, { Schema, Document } from 'mongoose';
import '../services/db';
import userSchema from '../schema/dbSchema/userSchema';
import { IUser } from '../interfaces/IUserDataType';
const userDB = mongoose.model<IUser>('ab_users', userSchema);

export class userModel {

 findOne = async (email: string): Promise<IUser | null | unknown> => {
  try {
   const query = { email }; // Empty query finds all documents
   const options = {}; // You can add options here, like sort, limit, etc.
   const user = await userDB.findOne(query, null, options).exec();
   return user as IUser
  } catch (error) {
   console.error('Error finding user by userId:', error);
   throw error;
  }
 };

 createOne = async (email: string, otp:number): Promise<IUser | null | unknown> => {
  try {
   const query = { "email": email, "otp":otp};
   const newUser = new userDB(query)
   const user = await newUser.save();
   return user;
  } catch (error) {
   console.error('Error finding user by userId:', error);
   throw error;
  }
 };

 updateOtp = async (_id: any, otp:number): Promise<IUser | null | unknown> => {
  try {
   const filter = { "_id": _id };
   const query = { $set: { "otp": otp } };
   const result = await userDB.updateOne(filter, query).exec();
   return result;
  } catch (error) {
   console.error('Error finding user by userId:', error);
   throw error;
  }
 };

 login = async (email: any, otp:number): Promise<IUser | null | unknown> => {
  try {
   const query = { $and:[{"email":email}, { "otp": otp } ]};
   const result = await userDB.findOne(query).exec();
   return result;
  } catch (error) {
   console.error('Error finding user by userId:', error);
   throw error;
  }
 };


}
