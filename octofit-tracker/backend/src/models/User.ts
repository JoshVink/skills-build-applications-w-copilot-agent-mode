import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    teamName: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    weeklyActiveMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);