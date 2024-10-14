import mongoose from "mongoose";
import submissionSchema from "../schema/dbSchema/submisstionSchema";
import { ISubmission } from "../interfaces/ISubmissionType";
const submissionDB = mongoose.model<ISubmission>('ab_submission', submissionSchema);

export class submissionModel {

 saveResponse = async (userId: string, testId: string, attempted: any, unattempted: any): Promise<ISubmission | null | unknown> => {
  try {
   const transformedAttempted = attempted?.map((item: any) => {
    return { question_id: item.questionId, option_id: item.optionId }
   })
   const user_id = new mongoose.Types.ObjectId(userId)
   const test_id = new mongoose.Types.ObjectId(testId)
   const submission = new submissionDB({
    user_id: user_id,
    test_id: test_id,
    attempted: transformedAttempted,
    unattempted: unattempted
   });
   const savedResponse = await submission.save();
   return savedResponse;
   return
  } catch (error) {
   console.error('Error submission test response:', error);
   throw error;
  }
 };

 findExist = async (userId: string, testId: string): Promise<ISubmission | null | unknown> => {
  try {
   const user_id = new mongoose.Types.ObjectId(userId)
   const test_id = new mongoose.Types.ObjectId(testId)
   const response = await submissionDB.findOne({ user_id, test_id });
   return response
  } catch (error) {
   console.error('Error submission test response:', error);
   throw error;
  }
 };

}