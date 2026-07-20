/**
 * ============================================
 * 📄 WHAT : TypeScript SHAPES for the User resource (no runtime code).
 * 🎯 WHY  : One source of truth for "what a user looks like" — model, service
 *           and controller all import these, so they can never disagree.
 * 🔁 FLOW : imported by models/User.model.ts and services/auth.service.ts
 * ============================================
 *
 * Naming pattern (same for every resource):
 *   I<Name>            = the document as stored in MongoDB
 *   <Action><Name>Input = what the client may SEND for that action
 */
import type { Document } from 'mongoose';

/** Who a user is allowed to be. Used by middleware/authorize.ts. */
export type UserRole = 'user' | 'admin';

// The user document inside MongoDB.
export interface IUser extends Document {
  name: string;
  email: string;
  contact: string;
  password: string; // ⚠️ always the bcrypt HASH — never the real password
  role: UserRole; //   authorization: what this user MAY do (default 'user')
  createdAt: Date;
  updatedAt: Date;
}

// Body of POST /api/auth/register
export interface RegisterInput {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

// Body of POST /api/auth/login
export interface LoginInput {
  email: string;
  password: string;
}

// Body of PATCH /api/users/me/password — a user changing their OWN password.
// Requires the current password: proves it's really them at the keyboard.
export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Body of PATCH /api/users/:id/password — an ADMIN resetting someone's password.
// No current password (the admin doesn't know it — that's the point).
export interface ResetPasswordInput {
  newPassword: string;
  confirmPassword: string;
}

// What we send back to the client for a user. NOTE: no password field —
// the safe public shape (session-safe projection).
export interface PublicUser {
  id: string;
  name: string;
  email: string;
  contact: string;
  role: UserRole;
  createdAt: Date;
}
