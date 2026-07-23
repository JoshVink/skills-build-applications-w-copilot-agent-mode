"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
const handleRouteError = (res, error) => {
    console.error('API route error:', error);
    res.status(500).json({ error: 'Unable to load OctoFit data' });
};
router.get('/users/', async (_req, res) => {
    try {
        const users = await User_1.default.find().sort({ name: 1 }).lean();
        res.json({ users });
    }
    catch (error) {
        handleRouteError(res, error);
    }
});
router.get('/teams/', async (_req, res) => {
    try {
        const teams = await Team_1.default.find().sort({ weeklyPoints: -1 }).lean();
        res.json({ teams });
    }
    catch (error) {
        handleRouteError(res, error);
    }
});
router.get('/activities/', async (_req, res) => {
    try {
        const activities = await Activity_1.default.find().sort({ completedAt: -1 }).lean();
        res.json({ activities });
    }
    catch (error) {
        handleRouteError(res, error);
    }
});
router.get('/leaderboard/', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard_1.default.find().sort({ rank: 1 }).lean();
        res.json({ leaderboard });
    }
    catch (error) {
        handleRouteError(res, error);
    }
});
router.get('/workouts/', async (_req, res) => {
    try {
        const workouts = await Workout_1.default.find().sort({ difficulty: 1, title: 1 }).lean();
        res.json({ workouts });
    }
    catch (error) {
        handleRouteError(res, error);
    }
});
exports.default = router;
