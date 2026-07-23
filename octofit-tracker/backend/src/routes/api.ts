import { Router } from 'express';
import type { Response } from 'express';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const router = Router();

const handleRouteError = (res: Response, error: unknown) => {
  console.error('API route error:', error);
  res.status(500).json({ error: 'Unable to load OctoFit data' });
};

router.get('/users/', async (_req, res) => {
  try {
    const users = await User.find().sort({ name: 1 }).lean();
    res.json({ users });
  } catch (error) {
    handleRouteError(res, error);
  }
});

router.get('/teams/', async (_req, res) => {
  try {
    const teams = await Team.find().sort({ weeklyPoints: -1 }).lean();
    res.json({ teams });
  } catch (error) {
    handleRouteError(res, error);
  }
});

router.get('/activities/', async (_req, res) => {
  try {
    const activities = await Activity.find().sort({ completedAt: -1 }).lean();
    res.json({ activities });
  } catch (error) {
    handleRouteError(res, error);
  }
});

router.get('/leaderboard/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean();
    res.json({ leaderboard });
  } catch (error) {
    handleRouteError(res, error);
  }
});

router.get('/workouts/', async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, title: 1 }).lean();
    res.json({ workouts });
  } catch (error) {
    handleRouteError(res, error);
  }
});

export default router;