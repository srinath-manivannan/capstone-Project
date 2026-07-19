import type { Request, Response, NextFunction } from 'express';
import type { ObjectSchema } from 'yup';

/**
 * Runs a Yup schema against req.body BEFORE the request reaches the controller.
 * We reuse Yup here (same library as the frontend) so validation rules
 * and error messages stay consistent between client and server.
 *
 * The frontend already validates with Yup too - this is the backend's
 * OWN check, because client-side validation can always be bypassed
 * (e.g. someone calling the API directly with Postman).
 */
export function validateRequest(schema: ObjectSchema<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
      next();
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: err.errors, // array of readable messages
      });
    }
  };
}
