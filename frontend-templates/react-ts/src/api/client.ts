/**
 * ============================================
 * 📄 WHAT : STEP 3 — the ONE axios instance every request goes through.
 * 🎯 WHY  : Base URL (and later: auth headers, error handling) configured
 *           ONCE. Components never import axios — services import this.
 * 🔁 FLOW : services (todosApi.ts) ➜ THIS FILE ➜ the backend
 * ============================================
 */
import axios from 'axios';
import { env } from '../config/env';

export const apiClient = axios.create({
  baseURL: env.API_URL,
});

// Real project? Add your auth token + 401 handling here, ONCE:
// apiClient.interceptors.request.use((config) => { …attach token… });
// apiClient.interceptors.response.use(…, (error) => { …handle 401… });

/** Pulls a readable message out of any axios error. */
export function getErrorMessage(error: unknown, fallback: string): string {
  const err = error as { response?: { data?: { message?: string } }; message?: string };
  return err?.response?.data?.message || err?.message || fallback;
}
