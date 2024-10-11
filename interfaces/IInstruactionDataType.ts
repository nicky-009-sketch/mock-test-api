import { Document } from 'mongoose';

export interface IInstruction extends Document {
 instruction_text?: string;
}
