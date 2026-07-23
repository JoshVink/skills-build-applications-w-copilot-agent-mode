import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focus: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    recommendedFor: [{ type: String, required: true }],
    exercises: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default mongoose.model('Workout', workoutSchema);