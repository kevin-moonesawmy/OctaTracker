import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ava Patel', email: 'ava.patel@mergington.edu', role: 'student', age: 15, teamId: 'trail-blazers' },
      { name: 'Leo Martinez', email: 'leo.martinez@mergington.edu', role: 'student', age: 16, teamId: 'trail-blazers' },
      { name: 'Maya Ross', email: 'maya.ross@mergington.edu', role: 'student', age: 15, teamId: 'cardio-crew' },
      { name: 'Coach Kim', email: 'coach.kim@mergington.edu', role: 'coach', age: 34 },
    ]);

    const teams = await Team.insertMany([
      { name: 'Trail Blazers', members: [users[0]._id.toString(), users[1]._id.toString()], score: 245, color: '#22c55e' },
      { name: 'Cardio Crew', members: [users[2]._id.toString()], score: 210, color: '#f59e0b' },
    ]);

    await Activity.insertMany([
      { userId: users[0]._id.toString(), type: 'running', durationMinutes: 35, caloriesBurned: 280, date: new Date('2026-09-18') },
      { userId: users[1]._id.toString(), type: 'strength', durationMinutes: 45, caloriesBurned: 340, date: new Date('2026-09-19') },
      { userId: users[2]._id.toString(), type: 'walking', durationMinutes: 28, caloriesBurned: 180, date: new Date('2026-09-20') },
    ]);

    await LeaderboardEntry.insertMany([
      { rank: 1, name: 'Ava Patel', points: 980 },
      { rank: 2, name: 'Leo Martinez', points: 940 },
      { rank: 3, name: 'Maya Ross', points: 900 },
    ]);

    await Workout.insertMany([
      { title: 'Morning Run', difficulty: 'easy', durationMinutes: 30, focus: 'cardio', description: 'Build endurance through a steady-paced run.' },
      { title: 'Strength Circuit', difficulty: 'moderate', durationMinutes: 40, focus: 'muscle', description: 'Focus on lower-body and core strength.' },
      { title: 'Mobility Flow', difficulty: 'easy', durationMinutes: 20, focus: 'recovery', description: 'Improve flexibility and reduce soreness.' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
