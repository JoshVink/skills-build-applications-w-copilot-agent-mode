import mongoose, { Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    rank: { type: Number, required: true },
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    activeMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Leaderboard', leaderboardSchema);