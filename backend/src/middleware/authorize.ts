/**
 * ============================================
 * 📄 WHAT : `requireAdmin` — the AUTHORIZATION guard (what you may DO).
 * 🎯 WHY  : `protect` (auth.ts) answers "WHO are you?" → 401 if unknown.
 *           THIS answers "are you ALLOWED?" → 403 if known but not permitted.
 *           Without it, any logged-in user could delete every account —
 *           OWASP's #1 risk, "Broken Access Control".
 * 🔁 FLOW : routes ➜ protect (sets req.userId) ➜ THIS FILE ➜ controller
 * ============================================
 *
 * 💬 INTERVIEW: "401 vs 403?" — 401 = not authenticated (log in);
 * 403 = authenticated but not authorized ("I know exactly who you are,
 * and you still can't have this"). These two files are that distinction.
 */
import type { Request, Response, NextFunction } from 'express';
import User from '../models/User.model';
import { AppError } from '../utils/AppError';
import { asyncHandler } from '../utils/asyncHandler';

export const requireAdmin = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    // STEP 1: `protect` must have run first and put the id on the request.
    if (!req.userId) throw new AppError('Not authorized — no token provided', 401);

    // STEP 2: read the role from the DATABASE, never from the token payload.
    // 💬 INTERVIEW: "Why not put the role in the JWT?" — you can, but a token
    // issued before a demotion would still say 'admin' until it expires.
    // Reading live data means revoking admin takes effect immediately.
    const user = await User.findById(req.userId).select('role');
    if (!user) throw new AppError('Not authorized — user no longer exists', 401);

    // STEP 3: known user, wrong privileges → 403 (NOT 401).
    if (user.role !== 'admin') {
      throw new AppError('Forbidden — admin access required', 403);
    }

    next();
  }
);
