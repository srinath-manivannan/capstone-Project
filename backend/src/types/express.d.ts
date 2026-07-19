/**
 * ============================================
 * 📄 WHAT : Type augmentation — teaches TypeScript that req.userId exists.
 * 🎯 WHY  : middleware/auth.ts SETS req.userId and controllers READ it.
 *           Express's built-in Request type doesn't know about it, so we
 *           extend the type here once, instead of casting everywhere (DRY).
 * 🔁 FLOW : (types only — no runtime code; applies project-wide automatically)
 * ============================================
 */
import 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string; // set by `protect` after verifying the JWT
    }
  }
}

export {};
