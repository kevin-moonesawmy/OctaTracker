import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    members: [{ type: String, required: true }],
    score: { type: Number, default: 0 },
    color: { type: String, default: '#4f46e5' },
  },
  { timestamps: true },
);

export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
