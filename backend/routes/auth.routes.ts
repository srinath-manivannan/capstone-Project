import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validateRequest';
import { asyncHandler } from '../utils/asyncHandler';
import { registerSchema, loginSchema, forgotPasswordSchema } from '../validations/auth.validation';

const router = Router();

// Request flow for each line below:
// request -> validateRequest (checks the data) -> asyncHandler (catches errors) -> controller -> service -> model
router.post('/register', validateRequest(registerSchema), asyncHandler(authController.register));
router.post('/login', validateRequest(loginSchema), asyncHandler(authController.login));
router.post('/forgot-password', validateRequest(forgotPasswordSchema), asyncHandler(authController.forgotPassword));

export default router;