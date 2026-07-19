/**
 * ============================================
 * 📄 WHAT : Creates the signed JWT (login token) for a user.
 * 🎯 WHY  : DRY — register AND login both need a token; the signing logic
 *           lives once, here. Change expiry or payload in one place.
 * 🔁 FLOW : services/auth.service.ts ➜ THIS FILE ➜ token returned to the frontend
 * ============================================
 *
 * 💬 INTERVIEW: "What is a JWT?" — three base64 parts: header.payload.signature.
 * The payload (here: the user's id) is READABLE by anyone, but the signature is
 * made with our secret — so nobody can FORGE or EDIT a token without the secret.
 * 💬 INTERVIEW: "Where is the session stored?" — nowhere! JWTs are stateless:
 * the token itself is the proof, so the server keeps no session table.
 */
import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export function generateToken(userId: string): string {
  // expiresIn (e.g. '7d') forces re-login later — never issue tokens that live forever.
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] };
  return jwt.sign({ id: userId }, env.JWT_SECRET, options);
}
