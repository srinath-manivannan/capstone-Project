/**
 * ============================================
 * 📄 WHAT : STEP 1 of every API's journey — environment configuration.
 * 🎯 WHY  : URLs differ between laptop and production; they live in .env,
 *           and ONLY this file reads them. One source of config.
 * 🔁 FLOW : .env ➜ THIS FILE ➜ api/client.ts (baseURL)
 * ============================================
 */
export const env = {
  /** Base URL of the API. Falls back to the free demo API so `npm run dev` works instantly. */
  API_URL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
};
