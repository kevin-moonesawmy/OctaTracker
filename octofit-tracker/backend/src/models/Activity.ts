import mongoose, { Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
