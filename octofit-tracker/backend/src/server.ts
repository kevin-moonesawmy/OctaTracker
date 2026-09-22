import express, { type Request, type Response } from 'express';
import './config/database.js';
import { Activity } from './models/Activity.js';
import { LeaderboardEntry } from './models/LeaderboardEntry.js';
import { Team } from './models/Team.js';
import { User } from './models/User.js';
import { Workout } from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
//step 4 implemented here
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api', (_request, response) => {
  response.json({
    app: 'OctoFit Tracker',
    apiBaseUrl,
    endpoints: [
      '/api/health',
      '/api/users',
      '/api/teams',
      '/api/activities',
      '/api/leaderboard',
      '/api/workouts',
    ],
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.get(['/api/users', '/api/users/'], async (_request, response: Response) => {
  const users = await User.find({}).lean();
  response.json(users);
});

app.post(['/api/users', '/api/users/'], async (request: Request, response: Response) => {
  try {
    const user = await User.create(request.body ?? {});
    response.status(201).json(user);
  } catch (error) {
    response.status(400).json({ message: 'Invalid user payload', error });
  }
});

app.get(['/api/teams', '/api/teams/'], async (_request, response: Response) => {
  const teams = await Team.find({}).lean();
  response.json(teams);
});

app.post(['/api/teams', '/api/teams/'], async (request: Request, response: Response) => {
  try {
    const team = await Team.create(request.body ?? {});
    response.status(201).json(team);
  } catch (error) {
    response.status(400).json({ message: 'Invalid team payload', error });
  }
});

app.get(['/api/activities', '/api/activities/'], async (_request, response: Response) => {
  const activities = await Activity.find({}).lean();
  response.json(activities);
});

app.post(['/api/activities', '/api/activities/'], async (request: Request, response: Response) => {
  try {
    const activity = await Activity.create(request.body ?? {});
    response.status(201).json(activity);
  } catch (error) {
    response.status(400).json({ message: 'Invalid activity payload', error });
  }
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_request, response: Response) => {
  const leaderboard = await LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
  response.json(leaderboard);
});

app.get(['/api/workouts', '/api/workouts/'], async (_request, response: Response) => {
  const workouts = await Workout.find({}).lean();
  response.json(workouts);
});

app.post(['/api/workouts', '/api/workouts/'], async (request: Request, response: Response) => {
  try {
    const workout = await Workout.create(request.body ?? {});
    response.status(201).json(workout);
  } catch (error) {
    response.status(400).json({ message: 'Invalid workout payload', error });
  }
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
