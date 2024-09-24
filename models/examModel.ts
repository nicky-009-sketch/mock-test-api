import mongoose from "mongoose";
import { IExam } from "../interfaces/IExamDataType";
import examSchema from "../schema/dbSchema/examSchema";
const examDB = mongoose.model<IExam>('ab_exams', examSchema);


export class examModel {

 findAll = async (): Promise<IExam | null | unknown> => {
  try {
   const exams = await examDB.find().exec();
   return exams;
  } catch (error) {
   console.error('Error finding all exams:', error);
   throw error;
  }
 };

}