import mongoose from "mongoose";
import instructionSchema from "../schema/dbSchema/instructionSchema";
import { IInstruction } from "../interfaces/IInstruactionDataType";
const instructionDB =mongoose.model<IInstruction>('ab_instructions', instructionSchema)

export class instructionModel {

 findById = async (id:string): Promise<IInstruction[] | null | undefined> => {
  try {
   const _id = new mongoose.Types.ObjectId(id)
   const query = {_id:_id};
   const options = {};
   const instruction = await instructionDB.find(query).exec();
   return instruction
  } catch (error) {
   console.error('Error finding all exams:', error);
   throw error;
  }
 };

}