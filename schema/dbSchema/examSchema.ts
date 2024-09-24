import { Schema } from "mongoose";

const examSchema = new Schema({
 org_id: { type: String, required: true },
 exam_name: { type: String, required: true },
 exam_duration: { type: String, required: true },
 created_at: { type: String, required: true },
 updated_at: { type: String, required: true },
})

export default examSchema