import mongoose from "mongoose";
import questionSchema from "../schema/dbSchema/questionSchema";
import { IQuestion } from "../interfaces/IQuestionDataType";
const questionDB = mongoose.model<IQuestion>('ab_questions', questionSchema);

export class questionModel {

 list = async (testId: string): Promise<IQuestion | null | unknown> => {
  try {
   const test_id = new mongoose.Types.ObjectId(testId)
   const query = {test_id:test_id};
   const options = {};
   const ques = await questionDB.find(query).exec();
   return ques
  } catch (error) {
   console.error('Error finding test questions:', error);
   throw error;
  }
 };

}