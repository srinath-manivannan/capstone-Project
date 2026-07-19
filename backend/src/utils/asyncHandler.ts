/**
 * ============================================
 * 📄 WHAT : A tiny wrapper that catches errors from async controllers.
 * 🎯 WHY  : DRY — without it, EVERY controller would need its own try/catch.
 *           With it, any thrown error (or rejected Promise) is automatically
 *           forwarded to errorHandler.ts, and the server never crashes or hangs.
 * 🔁 FLOW : routes/*.ts wraps each controller ➜ THIS FILE ➜ on error: errorHandler.ts
 * ============================================
 *
 * Usage in a route: router.get('/', asyncHandler(itemController.getItems));
 *
 * 💬 INTERVIEW: "What happens if an async Express handler throws and you don't
 * catch it?" — in Express 4 the request hangs forever (Express only auto-catches
 * SYNC errors). This wrapper is the classic fix.
 */
import type { Request, Response, NextFunction, RequestHandler } from 'express';

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler =>
  (req, res, next) => {
    // Run the controller; if its Promise rejects, hand the error to next(),
    // which sends it to the error-handling middleware.
    Promise.resolve(fn(req, res, next)).catch(next);
  };
