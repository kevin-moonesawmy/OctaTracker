import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['easy', 'moderate', 'hard'], default: 'easy' },
    durationMinutes: { type: Number, required: true, min: 10 },
    focus: { type: String, required: true },
    description: { type: String, default: '' },
  },
  { timestamps: true },
);

export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
