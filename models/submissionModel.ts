import mongoose from "mongoose";
import submissionSchema from "../schema/dbSchema/submisstionSchema";
import { ISubmission } from "../interfaces/ISubmissionType";
const submissionDB = mongoose.model<ISubmission>('ab_submission', submissionSchema);

export class submissionModel {

 saveResponse = async (user_id: string, test_id: string, attempted: any, unattempted: any): Promise<ISubmission | null | unknown> => {
  try {
   const submission = new submissionDB({
    user_id: user_id,
    test_id: test_id,
    attempted: attempted,
    unattempted: unattempted
   });
   const savedResponse = await submission.save();
   console.log('Response saved successfully:', savedResponse);
   return savedResponse;
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