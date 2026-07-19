// Type augmentation: adds `req.userId` to Express's Request type, so the
// `protect` middleware can set it and controllers can read it type-safely.
import 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export {};
