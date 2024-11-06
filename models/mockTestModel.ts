import mongoose from "mongoose";
import { IMockTest } from "../interfaces/IMockTestDataType";
import mockTestSchema from "../schema/dbSchema/mockTestSchema";
import categorySchema from "../schema/dbSchema/categorySchema";
import { ICategory } from "../interfaces/ICategoryType";
const mockTestDB = mongoose.model<IMockTest>('ab_tests', mockTestSchema);
const categoryDB = mongoose.model<ICategory>('ab_categories', categorySchema);

export class mockTestModel {

 list = async (examId: string, categoryId:string): Promise<IMockTest[] | undefined | null> => {
  try {
   const exam_id = new mongoose.Types.ObjectId(examId)
   const category_id = new mongoose.Types.ObjectId(categoryId)
   const query = { exam_id: exam_id, category_id:category_id };
   const options = {};
   const tests = await mockTestDB.find(query).lean().exec();
   return tests
  } catch (error) {
   console.error('Error finding all exams:', error);
   throw error;
  }
 };

 categories = async (examId: string): Promise<ICategory[] | undefined | null> => {
  try {
   const exam_id = new mongoose.Types.ObjectId(examId)
   const query = { exam_id: exam_id };
   const options = {};
   const categories = await categoryDB.find(query).lean().exec();
   return categories
  } catch (error) {
   console.error('Error finding all exams:', error);
   throw error;
  }
 };

}