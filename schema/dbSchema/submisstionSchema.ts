import mongoose, { Schema } from "mongoose";

const attemptedSchema = new Schema({
 question_id: { type: mongoose.Schema.Types.ObjectId, required: true },
 option_id: { type: mongoose.Schema.Types.Number, required: true },
}, { _id: false });  // Disable _id for items in attempted array

const submissionSchema = new Schema({
 user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
 test_id: { type: mongoose.Schema.Types.ObjectId, required: true },
 attempted: [attemptedSchema],
 unattempted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ab_questions' }],
 submitted_at: { type: Date, default: Date.now },
});

// Create a compound index on user_id and test_id to enforce uniqueness
submissionSchema.index({ user_id: 1, test_id: 1 }, { unique: true });

export default submissionSchema
