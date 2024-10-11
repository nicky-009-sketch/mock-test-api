import { Schema } from "mongoose";

const instructionSchema = new Schema({
 instruction_text: { type: String, required: false },
})

export default instructionSchema