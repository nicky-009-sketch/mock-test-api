import mongoose, { Schema } from "mongoose";

const optionSchema = new Schema({
 option_id: { type: Number, required: true },
 option_text: {
  en: { type: String, required: true },
  hi: { type: String, required: false } 
 },
 isCorrect: { type: Boolean, required: true }
})

const questionSchema = new Schema({
 test_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
 question_text: {
  en: { type: String, required: true },
  hi: { type: String, required: false } 
 },
 options: [optionSchema],
 created_at: { type: Date, default: Date.now },
 updated_at: { type: Date, default: Date.now }
})

export default questionSchema
