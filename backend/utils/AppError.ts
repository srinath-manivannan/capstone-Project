/**
 * A custom error class that carries an HTTP status code.
 * Throw this anywhere in a service (e.g. `throw new AppError('Email already used', 409)`)
 * and errorHandler.ts will automatically turn it into the right response.
 */
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}