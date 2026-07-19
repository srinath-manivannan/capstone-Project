/**
 * ============================================
 * 📄 WHAT : The MongoDB connection — the only file that "dials" the database.
 * 🎯 WHY  : SRP — connection logic lives here once. If you ever switch how you
 *           connect (local ↔ Atlas, add options), you edit ONE file.
 * 🔁 FLOW : server.ts ➜ THIS FILE ➜ MongoDB (then models talk to it via mongoose)
 * ============================================
 */
import mongoose from 'mongoose';
import { env } from './env';

export async function connectDB() {
  try {
    // STEP 1: try to connect. Fail fast (8s) instead of hanging ~30s when the
    // cluster is unreachable — usually your IP isn't whitelisted in Atlas.
    await mongoose.connect(env.MONGO_URI, { serverSelectionTimeoutMS: 8000 });
    console.log('✅ MongoDB connected');
  } catch (err) {
    // STEP 2: if it fails, print WHY + the usual fixes, then exit.
    console.error('❌ MongoDB connection failed:', (err as Error).message);
    console.error(
      'Hint: check that (1) your IP is allowed in Atlas -> Network Access, ' +
        '(2) the DB username/password in .env are correct, and ' +
        '(3) special characters in the password are URL-encoded.'
    );
    process.exit(1); // no point running an API without its database
  }
}
