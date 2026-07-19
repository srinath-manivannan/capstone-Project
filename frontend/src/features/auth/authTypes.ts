/**
 * ============================================
 * 📄 WHAT : TypeScript SHAPES for the auth feature (no runtime code).
 * 🎯 WHY  : One source of truth for "what auth data looks like" — thunks,
 *           slice and components all import these, so they never disagree.
 * 🔁 FLOW : imported by authThunks.ts, authSlice.ts and the Auth pages
 * ============================================
 */

/** The logged-in user (mirrors what the backend returns — never the password). */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  contact: string;
}

/** Body of POST /auth/register */
export interface RegisterPayload {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

/** Body of POST /auth/login */
export interface LoginPayload {
  email: string;
  password: string;
}

/** Body of POST /auth/forgot-password */
export interface ForgotPasswordPayload {
  email: string;
}

/** What the backend's register/login return inside { success, data }. */
export interface AuthResponse {
  token: string;
  user: AuthUser;
}

/** The standard async status every feature's state uses. */
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

/** The auth part of the Redux store. */
export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  status: RequestStatus;
  error: string | null;
  forgotMessage: string | null; // success text after "forgot password"
}
