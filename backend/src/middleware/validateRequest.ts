/**
 * ============================================
 * 📄 WHAT : Runs a Yup schema against req.body BEFORE the controller runs.
 * 🎯 WHY  : NEVER trust the client. The frontend validates too, but anyone can
 *           bypass it (Postman/curl). This is the backend's own front door.
 *           DRY — one reusable checker instead of if-checks in every controller.
 * 🔁 FLOW : route ➜ (protect) ➜ THIS FILE ➜ asyncHandler ➜ controller
 * ============================================
 *
 * Usage in a route: router.post('/', validateRequest(createItemSchema), …)
 *
 * 💬 INTERVIEW: "Why validate on the backend if the frontend already does?" —
 * client-side validation is a UX nicety; server-side validation is SECURITY.
 * The server is the only place you control.
 */
import type { Request, Response, NextFunction } from 'express';

// We only ever call `.validate()`, so accept anything that provides it.
// (Sidesteps yup's strict generics while staying type-safe here.)
type Validatable = {
  validate: (value: unknown, options?: Record<string, unknown>) => Promise<unknown>;
};

export function validateRequest(schema: Validatable) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // STEP 1: check ALL rules (abortEarly:false = report every problem,
      // not just the first) and DROP unknown fields (stripUnknown) so a
      // client can never sneak extra fields into the database.
      req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
      next(); // STEP 2: data is clean → continue to the controller
    } catch (err: any) {
      // STEP 3: bad data → 400 with readable messages. Controller never runs.
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: err.errors, // array of human-readable messages
      });
    }
  };
}
