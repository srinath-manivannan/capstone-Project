/**
 * ============================================
 * 📄 WHAT : The User MODEL — the Mongoose schema + the DB access object.
 * 🎯 WHY  : Models are the ONLY layer that talks to MongoDB. Controllers and
 *           routes never import a model directly — services do (decoupling:
 *           swap the database later, only models/services change).
 * 🔁 FLOW : services/auth.service.ts ➜ THIS FILE ➜ MongoDB "users" collection
 * ============================================
 */
import { Schema, model } from 'mongoose';
import type { IUser } from '../types/user.types';

// The schema = the rules MongoDB enforces for every user document.
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    // unique: true creates a DB index — two accounts can never share an email.
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    contact: { type: String, required: true, trim: true },
    // 🔒 select: false = the password HASH is hidden from every query by
    // default; you must explicitly ask with .select('+password') (login does).
    // 💬 INTERVIEW: "How do you make sure passwords never leak in API
    // responses?" — never store plaintext (bcrypt hash) AND hide the field
    // by default at the schema level, exactly like this.
    password: { type: String, required: true, select: false },
    // AUTHORIZATION: what this user may DO. Defaults to 'user' — nobody can
    // make themselves an admin by sending role:'admin' at register, because
    // the register service never reads this field from the request body.
    // 💬 INTERVIEW: "How do you prevent privilege escalation on signup?" —
    // never trust client-supplied roles; set them server-side only.
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true } // auto createdAt / updatedAt on every document
);

// model('User', …) ➜ mongoose creates/uses the "users" collection.
export default model<IUser>('User', userSchema);
