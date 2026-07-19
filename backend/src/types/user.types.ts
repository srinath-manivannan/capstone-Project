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

// The user document inside MongoDB.
export interface IUser extends Document {
  name: string;
  email: string;
  contact: string;
  password: string; // ⚠️ always the bcrypt HASH — never the real password
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
