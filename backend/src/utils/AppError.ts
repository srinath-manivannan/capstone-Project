/**
 * ============================================
 * 📄 WHAT : A custom Error that carries an HTTP status code.
 * 🎯 WHY  : Services need to say "this failed AND here's the right status"
 *           (404 not found, 401 unauthorized, 409 conflict…) without knowing
 *           anything about Express (decoupling — services never touch `res`).
 * 🔁 FLOW : thrown in a service ➜ caught by asyncHandler ➜ middleware/errorHandler.ts
 * ============================================
 *
 * Usage anywhere: throw new AppError('Item not found', 404);
 *
 * 💬 INTERVIEW: "How do you handle errors centrally in Express?" — throw a
 * typed error like this, catch it in ONE error-handling middleware, and map
 * it to a clean JSON response. Never try/catch + res.json in every controller (DRY).
 */
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    // Keeps `instanceof AppError` working after TypeScript compiles the class.
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
