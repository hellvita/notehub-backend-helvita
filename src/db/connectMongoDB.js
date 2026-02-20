import mongoose from 'mongoose';
import { Note } from '../models/note.js';
import { getEnv } from '../helpers/getEnv.js';
import { ENV_VARS } from '../constants/env.js';

export const connectMongoDB = async () => {
  try {
    const user = getEnv(ENV_VARS.MongoDB.DB_USER);
    const password = getEnv(ENV_VARS.MongoDB.DB_PASSWORD);
    const host = getEnv(ENV_VARS.MongoDB.DB_HOST);
    const database = getEnv(ENV_VARS.MongoDB.DB_NAME);
    const appName = getEnv(ENV_VARS.MongoDB.DB_APP_NAME);

    const mongoURL = `mongodb+srv://${user}:${password}@${host}/${database}?appName=${appName}`;

    await mongoose.connect(mongoURL);
    console.log('✅ MongoDB connection established successfully');

    await Note.syncIndexes();
    console.log('ℹ️  Indexes synced successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);

    process.exit(1);
  }
};
