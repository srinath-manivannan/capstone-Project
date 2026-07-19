import type { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Wraps an async controller function so that if it throws (or its
 * Promise rejects), the error automatically goes to errorHandler.ts
 * instead of crashing the server or hanging the request.
 *
 * Usage: router.post('/register', asyncHandler(authController.register));
 */
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
