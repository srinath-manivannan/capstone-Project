import mongoose from 'mongoose';
import { env } from './env';

export async function connectDB() {
  try {
    // Fail fast (8s) instead of hanging ~30s when the cluster is unreachable —
    // usually that means your IP isn't whitelisted in Atlas -> Network Access.
    await mongoose.connect(env.MONGO_URI, { serverSelectionTimeoutMS: 8000 });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', (err as Error).message);
    console.error(
      'Hint: check that (1) your IP is allowed in Atlas -> Network Access, ' +
        '(2) the DB username/password in .env are correct, and ' +
        '(3) special characters in the password are URL-encoded.'
    );
    process.exit(1); // no point running the server without a database
  }
}