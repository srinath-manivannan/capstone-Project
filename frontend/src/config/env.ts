/**
 * ============================================
 * 📄 WHAT : STEP 1 of every API's journey — environment configuration.
 * 🎯 WHY  : URLs and settings differ between your laptop and production.
 *           They live in .env (never hardcoded) and are read ONLY here,
 *           so the rest of the app has one single source of config.
 * 🔁 FLOW : .env ➜ THIS FILE ➜ api/client.ts (baseURL)
 * ============================================
 *
 * Vite rule: only variables prefixed with VITE_ are exposed to the browser.
 * ⚠️ Anything here IS visible to users (it ships in the JS bundle) — never
 * put real secrets in frontend env vars.
 */
export const env = {
  /** Base URL of our backend API (e.g. http://localhost:5000/api) */
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
};
