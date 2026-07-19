/**
 * ============================================
 * 📄 WHAT : `protect` — the GUARD for private routes (checks the login token).
 * 🎯 WHY  : DRY — instead of checking the token inside every controller,
 *           we check it ONCE here and reuse it on any route that needs login.
 * 🔁 FLOW : routes (router.use(protect)) ➜ THIS FILE ➜ validateRequest / controller
 * ============================================
 *
 * What it does, step by step:
 *   1. read the "Authorization: Bearer <token>" header
 *   2. verify the JWT signature with our secret
 *   3. put the user's id on req.userId (typed via types/express.d.ts)
 *   On any failure → AppError(401) → errorHandler sends a clean 401 JSON.
 *
 * 💬 INTERVIEW: "How does the server know who is logged in?" — the client sends
 * the JWT on EVERY request; we verify its signature. No session storage needed.
 */
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../utils/AppError';

export function protect(req: Request, _res: Response, next: NextFunction) {
  // STEP 1: the token must arrive as "Bearer eyJhbGci..."
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw new AppError('Not authorized — no token provided', 401);
  }

  const token = header.split(' ')[1];

  try {
    // STEP 2: verify = check the signature AND the expiry date.
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };

    // STEP 3: pass the user's id forward for controllers/services to use.
    req.userId = decoded.id;
    next(); // all good → continue to the next middleware / controller
  } catch {
    // Wrong signature, expired, or malformed — same generic answer for all.
    throw new AppError('Not authorized — token is invalid or expired', 401);
  }
}
