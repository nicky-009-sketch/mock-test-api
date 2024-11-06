import mongoose, { Schema } from "mongoose";

const mockTestSchema = new Schema({
 exam_id: { type: mongoose.Schema.Types.ObjectId, required: true },
 subject_id: { type: mongoose.Schema.Types.ObjectId, required: false, default: null },
 category_id: { type: mongoose.Schema.Types.ObjectId, required: true },
 name: { type: String, required: false },
 duration: { type: String, required: false },
 marks: { type: String, required: false }
})

export default mockTestSchema




// exam_id: { type: mongoose.Schema.Types.ObjectId, required: true },
// instruction_id: { type: mongoose.Schema.Types.ObjectId, required: true },
// test_name: { type: String, required: false },
// test_duration: { type: String, required: false },
// total_marks: { type: String, required: false },
// positive_marks: { type: String, required: false },
// negative_marks: { type: String, required: false },
// created_at: { type: String, required: false },
// updated_at: { type: String, required: false },