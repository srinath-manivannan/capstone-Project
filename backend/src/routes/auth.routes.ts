/**
 * ============================================
 * 📄 WHAT : The Auth ROUTES — the "table of contents" of the Auth API.
 * 🎯 WHY  : One glance shows every URL + verb, and which middleware guards it.
 * 🔁 FLOW : app.ts ('/api/auth') ➜ THIS FILE ➜ validate ➜ controller
 * ============================================
 *
 * NOTE: no `protect` here — these are PUBLIC routes. You can't demand a login
 * token from someone who is trying to log in!
 */
import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validateRequest';
import { asyncHandler } from '../utils/asyncHandler';
import { registerSchema, loginSchema, forgotPasswordSchema } from '../validations/auth.validation';

const router = Router();

//          URL                 validation                          controller
router.post('/register',        validateRequest(registerSchema),       asyncHandler(authController.register));
router.post('/login',           validateRequest(loginSchema),          asyncHandler(authController.login));
router.post('/forgot-password', validateRequest(forgotPasswordSchema), asyncHandler(authController.forgotPassword));

// 💬 INTERVIEW: "Why is login a POST and not a GET?" — credentials must travel
// in the request BODY (encrypted by HTTPS), never in a URL, because URLs get
// logged by servers, proxies and browser history.

export default router;
