import mongoose from "mongoose";
import { IMockTest } from "../interfaces/IMockTestDataType";
import mockTestSchema from "../schema/dbSchema/mockTestSchema";
const mockTestDB = mongoose.model<IMockTest>('ab_tests', mockTestSchema);

export class mockTestModel {

 list = async (examId: string): Promise<IMockTest | null | unknown> => {
  try {
   const exam_id = new mongoose.Types.ObjectId(examId)
   const query = {exam_id:exam_id};
   const options = {};
   const tests = await mockTestDB.find(query).exec();
   return tests
  } catch (error) {
   console.error('Error finding all exams:', error);
   throw error;
  }
 };

}