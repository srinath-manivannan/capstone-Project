/**
 * ============================================
 * 📄 WHAT : STEP 1 — environment configuration.
 * 🎯 WHY  : One file reads process.env. NEXT_PUBLIC_ vars are baked into the
 *           browser bundle too; server-only secrets would OMIT the prefix.
 * 🔁 FLOW : .env.local ➜ THIS FILE ➜ lib/api.ts (baseURL)
 * ============================================
 */
export const env = {
  /** Base URL of the API. Falls back to the free demo API so `npm run dev` works instantly. */
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com',
};
