import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    captain: { type: String, required: true },
    members: [{ type: String, required: true }],
    weeklyPoints: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Team', teamSchema);