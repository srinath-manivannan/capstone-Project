/**
 * ============================================
 * 📄 WHAT : The User ROUTES — the "table of contents" of the Users API.
 * 🎯 WHY  : One glance shows every URL, and — crucially — WHICH guard each
 *           one needs. Notice two tiers: self-service vs admin-only.
 * 🔁 FLOW : app.ts ('/api/users') ➜ THIS FILE ➜ protect ➜ [requireAdmin] ➜
 *           validate ➜ controller
 * ============================================
 */
import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validateRequest } from '../middleware/validateRequest';
import { asyncHandler } from '../utils/asyncHandler';
import { protect } from '../middleware/auth';
import { requireAdmin } from '../middleware/authorize';
import { changePasswordSchema, resetPasswordSchema } from '../validations/user.validation';

const router = Router();

// 🔒 Everything below needs a valid token (401 without one).
router.use(protect);

// ---- SELF-SERVICE: any logged-in user, but only on their OWN account ----
// Note there is no ":id" here — the id comes from the TOKEN (req.userId), so a
// user physically cannot target someone else by changing a URL.
router.get('/me', asyncHandler(userController.getMe));
router.patch(
  '/me/password',
  validateRequest(changePasswordSchema),
  asyncHandler(userController.changeOwnPassword)
);

// ---- ADMIN ONLY: managing OTHER people's accounts (403 without the role) ----
router.get('/', requireAdmin, asyncHandler(userController.getUsers));
router.patch(
  '/:id/password',
  requireAdmin,
  validateRequest(resetPasswordSchema),
  asyncHandler(userController.resetUserPassword)
);
router.delete('/:id', requireAdmin, asyncHandler(userController.deleteUser));

// ⚠️ ORDER MATTERS: '/me' is declared BEFORE '/:id' style routes elsewhere —
// otherwise Express would match "me" as an :id. Static paths always first.

export default router;
