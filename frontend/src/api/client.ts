/**
 * ============================================
 * 📄 WHAT : STEP 3 — the ONE axios instance every request goes through.
 * 🎯 WHY  : base URL, auth header and 401 handling are configured ONCE here
 *           (DRY). No component ever imports axios directly — thunks import
 *           this client, and the UI never sees axios at all.
 * 🔁 FLOW : feature thunks (authThunks / itemsThunks) ➜ THIS FILE ➜ backend
 * ============================================
 */
import axios from 'axios';
import { env } from '../config/env';

export const apiClient = axios.create({
  baseURL: env.API_URL,
});

// REQUEST interceptor — runs before EVERY request:
// attach the login token so protected backend routes accept us.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // JWT only — never app state
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE interceptor — runs after EVERY response:
// if the backend says 401 (token invalid/expired), force a clean logout.
// This runs OUTSIDE React, so we use window.location, not navigate().
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }
    return Promise.reject(error);
  }
);

/** The envelope EVERY backend response uses: { success, data } */
export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

/** Pulls a readable error message out of any axios error (for thunks). */
export function getErrorMessage(error: unknown, fallback: string): string {
  const err = error as { response?: { data?: { message?: string; errors?: string[] } } };
  return (
    err?.response?.data?.message ||
    err?.response?.data?.errors?.[0] ||
    fallback
  );
}
