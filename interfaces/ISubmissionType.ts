import { Document } from 'mongoose';

export interface ISubmission extends Document {
 user_id: string;
 test_id:string;
 attempted:{
  question_id:string, 
  option_id:number
 }[]
 unattempted:{question_id:string}[]
 submitted_at?: Date;
}