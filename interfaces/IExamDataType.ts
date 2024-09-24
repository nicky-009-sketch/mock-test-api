import { Document } from 'mongoose';

export interface IExam extends Document {
  org_id?: string;
  exam_name?: string;
  exam_duration?: number;
  created_at?: string
  updated_at?: string
}
