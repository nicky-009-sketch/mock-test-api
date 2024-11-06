import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
 exam_id: { type: mongoose.Schema.Types.ObjectId, required: true },
 name: { type: String, required: false },
})

export default categorySchema