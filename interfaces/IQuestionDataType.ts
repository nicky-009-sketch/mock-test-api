import { Document } from "mongoose";

export interface IOption {
 option_id: number;
 option_text: {
  en: string;
  hi?: string;
 };
 isCorrect: boolean;
}

export interface IQuestion extends Document {
 test_id: string;
 question_text: {
  en: string;
  hi?: string;
 };
 options: IOption[];
 created_at?: Date;
 updated_at?: Date;
}

export interface ITestQuestionsPostDataType {
 testId: string;
}
