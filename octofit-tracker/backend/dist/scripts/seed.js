"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            User_1.default.deleteMany({}),
            Team_1.default.deleteMany({}),
            Activity_1.default.deleteMany({}),
            Leaderboard_1.default.deleteMany({}),
            Workout_1.default.deleteMany({}),
        ]);
        await Team_1.default.insertMany([
            {
                name: 'Core Crushers',
                city: 'Seattle',
                captain: 'Maya Chen',
                members: ['Maya Chen', 'Theo Ramirez'],
                weeklyPoints: 1840,
            },
            {
                name: 'Sprint Syndicate',
                city: 'Austin',
                captain: 'Jordan Brooks',
                members: ['Jordan Brooks', 'Avery Patel'],
                weeklyPoints: 1715,
            },
        ]);
        await User_1.default.insertMany([
            {
                name: 'Maya Chen',
                email: 'maya.chen@example.com',
                role: 'Team Captain',
                teamName: 'Core Crushers',
                fitnessGoal: 'Build functional strength',
                weeklyActiveMinutes: 285,
            },
            {
                name: 'Theo Ramirez',
                email: 'theo.ramirez@example.com',
                role: 'Member',
                teamName: 'Core Crushers',
                fitnessGoal: 'Improve mobility and endurance',
                weeklyActiveMinutes: 230,
            },
            {
                name: 'Jordan Brooks',
                email: 'jordan.brooks@example.com',
                role: 'Team Captain',
                teamName: 'Sprint Syndicate',
                fitnessGoal: 'Run a sub-22 minute 5K',
                weeklyActiveMinutes: 260,
            },
            {
                name: 'Avery Patel',
                email: 'avery.patel@example.com',
                role: 'Member',
                teamName: 'Sprint Syndicate',
                fitnessGoal: 'Increase weekly cardio volume',
                weeklyActiveMinutes: 215,
            },
        ]);
        await Activity_1.default.insertMany([
            {
                userName: 'Maya Chen',
                teamName: 'Core Crushers',
                type: 'Strength Training',
                durationMinutes: 55,
                caloriesBurned: 420,
                completedAt: new Date('2026-07-20T14:30:00Z'),
            },
            {
                userName: 'Theo Ramirez',
                teamName: 'Core Crushers',
                type: 'Cycling',
                durationMinutes: 45,
                caloriesBurned: 380,
                completedAt: new Date('2026-07-21T12:15:00Z'),
            },
            {
                userName: 'Jordan Brooks',
                teamName: 'Sprint Syndicate',
                type: 'Interval Run',
                durationMinutes: 40,
                caloriesBurned: 460,
                completedAt: new Date('2026-07-22T11:00:00Z'),
            },
            {
                userName: 'Avery Patel',
                teamName: 'Sprint Syndicate',
                type: 'Rowing',
                durationMinutes: 35,
                caloriesBurned: 330,
                completedAt: new Date('2026-07-22T18:45:00Z'),
            },
        ]);
        await Leaderboard_1.default.insertMany([
            {
                rank: 1,
                userName: 'Maya Chen',
                teamName: 'Core Crushers',
                points: 980,
                activeMinutes: 285,
            },
            {
                rank: 2,
                userName: 'Jordan Brooks',
                teamName: 'Sprint Syndicate',
                points: 910,
                activeMinutes: 260,
            },
            {
                rank: 3,
                userName: 'Theo Ramirez',
                teamName: 'Core Crushers',
                points: 860,
                activeMinutes: 230,
            },
            {
                rank: 4,
                userName: 'Avery Patel',
                teamName: 'Sprint Syndicate',
                points: 805,
                activeMinutes: 215,
            },
        ]);
        await Workout_1.default.insertMany([
            {
                title: 'Foundation Strength Circuit',
                focus: 'Strength',
                difficulty: 'Intermediate',
                durationMinutes: 45,
                recommendedFor: ['Build functional strength', 'Improve mobility and endurance'],
                exercises: ['Goblet squats', 'Push-ups', 'Romanian deadlifts', 'Farmer carries'],
            },
            {
                title: '5K Pace Builder',
                focus: 'Cardio',
                difficulty: 'Advanced',
                durationMinutes: 38,
                recommendedFor: ['Run a sub-22 minute 5K', 'Increase weekly cardio volume'],
                exercises: ['Warm-up jog', '6 x 400m intervals', 'Tempo finish', 'Cooldown walk'],
            },
            {
                title: 'Recovery Mobility Flow',
                focus: 'Mobility',
                difficulty: 'Beginner',
                durationMinutes: 25,
                recommendedFor: ['Improve mobility and endurance', 'Increase weekly cardio volume'],
                exercises: ['Hip openers', 'Thoracic rotations', 'Hamstring flossing', 'Breathing reset'],
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
