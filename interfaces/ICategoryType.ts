import { Document } from 'mongoose';

export interface ICategory extends Document {
  exam_id?: string;
  name?: string;
}
