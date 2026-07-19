import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

/**
 * Creates a signed JWT containing the user's id.
 * The frontend stores this token and sends it back on every request
 * (as a Bearer token) to prove who's logged in.
 */
export function generateToken(userId: string): string {
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] };
  return jwt.sign({ id: userId }, env.JWT_SECRET, options);
}