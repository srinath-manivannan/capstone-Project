/**
 * ============================================
 * 📄 WHAT : The ENTRY POINT — the first file that runs (`npm run dev`).
 * 🎯 WHY  : One file, one job (SRP): connect the database, then start
 *           listening. Keeping "start up" separate from "app setup" (app.ts)
 *           also lets tests import the app WITHOUT starting a real server.
 * 🔁 FLOW : npm run dev ➜ THIS FILE ➜ config/db.ts (connect) ➜ app.listen()
 * ============================================
 */
import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

// STEP 1: Connect to MongoDB FIRST.
// STEP 2: Only THEN start accepting HTTP requests.
// 💬 INTERVIEW: "Why connect to the DB before app.listen()?" — so no request
// can ever arrive while the database isn't ready to serve it.
connectDB().then(() => {
  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
  });
});
