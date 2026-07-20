/**
 * ============================================
 * 📄 WHAT : TypeScript SHAPES for the users feature (no runtime code).
 * 🎯 WHY  : One source of truth — thunks, slice and components import these.
 * 🔁 FLOW : imported by usersThunks.ts, usersSlice.ts and the Users pages
 * ============================================
 */
import type { RequestStatus } from '../auth/authTypes';

export type UserRole = 'user' | 'admin';

/** A user exactly as the backend returns it (never includes a password). */
export interface AppUser {
  id: string;
  name: string;
  email: string;
  contact: string;
  role: UserRole;
  createdAt: string;
}

/** Body of PATCH /users/me/password — changing MY OWN password. */
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/** Body of PATCH /users/:id/password — ADMIN resetting someone's password. */
export interface ResetPasswordPayload {
  id: string;
  newPassword: string;
  confirmPassword: string;
}

/** The users part of the Redux store. */
export interface UsersState {
  list: AppUser[];
  me: AppUser | null;
  status: RequestStatus; // for the list fetch
  mutating: boolean; //     true during delete / password writes
  error: string | null;
  successMessage: string | null; // e.g. "Password updated successfully"
}
