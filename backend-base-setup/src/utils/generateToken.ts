import jwt from 'jsonwebtoken';
import { env } from '../config/env';

/**
 * Creates a signed JWT containing the user's id.
 * The frontend stores this token and sends it back on every request
 * (as a Bearer token) to prove who's logged in.
 */
export function generateToken(userId: string): string {
  return jwt.sign({ id: userId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}
