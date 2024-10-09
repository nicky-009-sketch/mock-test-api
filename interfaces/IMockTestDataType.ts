import { Document } from 'mongoose';

export interface IMockTest extends Document {
 exam_id?: string;
 test_name?: string;
 test_duration?: number;
 total_marks?: string
 positive_marks?: string
 negative_marks?: string
 created_at?: string
 updated_at?: string
}

export interface IExamMockTestPostDataType {
 examId: string;
}
