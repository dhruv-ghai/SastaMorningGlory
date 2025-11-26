import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.warn('⚠️  Server will start but database operations will fail.');
    console.warn('⚠️  Please ensure MongoDB is running on:', env.mongoUri);
    // Don't exit - allow server to start for UI demo purposes
  }
};

