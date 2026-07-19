import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../utils/AppError';

/**
 * Route guard for PROTECTED endpoints.
 *
 * Put `protect` in front of any route that needs a logged-in user. It:
 *   1. reads the "Authorization: Bearer <token>" header,
 *   2. verifies the JWT with our secret,
 *   3. attaches the user's id to req.userId for controllers to use.
 *
 * If the token is missing/invalid it throws AppError(401) and errorHandler
 * turns that into a clean JSON 401 response.
 */
export function protect(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    throw new AppError('Not authorized — no token provided', 401);
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
    req.userId = decoded.id;
    next();
  } catch {
    throw new AppError('Not authorized — token is invalid or expired', 401);
  }
}
