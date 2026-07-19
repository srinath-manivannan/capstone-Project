/**
 * ============================================
 * 📄 WHAT : Loads and validates every ENVIRONMENT VARIABLE, in one place.
 * 🎯 WHY  : Secrets (DB password, JWT secret) must NEVER be hardcoded or
 *           committed to git. Code reads them from `.env` via this file only —
 *           so the rest of the app never touches process.env directly (DRY +
 *           decoupling: swap .env for real cloud secrets later, nothing else changes).
 * 🔁 FLOW : .env file ➜ THIS FILE ➜ imported as `env` everywhere else
 * ============================================
 */
import dotenv from 'dotenv';
dotenv.config(); // STEP 1: read the .env file into process.env

// STEP 2: helper that CRASHES AT STARTUP if a required variable is missing.
// 💬 INTERVIEW: "Why fail fast?" — a missing secret discovered at startup is a
// 10-second fix; discovered at 2am on a live request, it's an outage.
function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// STEP 3: export ONE typed object. Optional values get safe defaults;
// secrets use required() so they can never silently be undefined.
export const env = {
  PORT: process.env.PORT || '5000',
  MONGO_URI: required('MONGO_URI'),      // secret — no default allowed
  JWT_SECRET: required('JWT_SECRET'),    // secret — no default allowed
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  NODE_ENV: process.env.NODE_ENV || 'development',
};
