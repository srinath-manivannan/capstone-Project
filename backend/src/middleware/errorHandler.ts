/**
 * ============================================
 * 📄 WHAT : The ONE central error catcher — every thrown error ends up here.
 * 🎯 WHY  : DRY + security — one consistent error response for the whole API,
 *           and raw stack traces never leak to the client (they reveal
 *           internals an attacker could use).
 * 🔁 FLOW : any throw ➜ asyncHandler's .catch(next) ➜ THIS FILE ➜ JSON response
 * ============================================
 *
 * Registered LAST in app.ts — Express finds error middleware by its
 * 4-argument signature (err, req, res, next).
 *
 * 💬 INTERVIEW: "How does Express know this is an ERROR handler and not a
 * normal middleware?" — purely by the 4 parameters. Remove one and it stops
 * being an error handler.
 */
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // STEP 1: our own AppErrors carry a status + safe message. Anything else is
  // unexpected → generic 500 (never expose internal error text to clients).
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : 'Something went wrong on the server';

  // STEP 2: log the REAL error for developers (terminal only, never the response).
  console.error(err);

  // STEP 3: same envelope shape as success responses, with success:false.
  res.status(statusCode).json({
    success: false,
    message,
  });
}
