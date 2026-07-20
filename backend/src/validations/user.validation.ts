/**
 * ============================================
 * 📄 WHAT : Yup VALIDATION SCHEMAS for the User-management endpoints.
 * 🎯 WHY  : "What input is acceptable" lives here, separate from the logic
 *           (SRP). validateRequest() runs these BEFORE any controller.
 * 🔁 FLOW : routes/user.routes.ts ➜ validateRequest(THIS) ➜ controller
 * ============================================
 */
import * as Yup from 'yup';

// Shared password rule — one definition, reused by both schemas (DRY).
const strongPassword = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .required('New password is required');

// PATCH /api/users/me/password — user changes their OWN password.
export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: strongPassword,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
    .required('Please confirm the new password'),
});

// PATCH /api/users/:id/password — ADMIN resets someone else's password.
// No currentPassword: the admin doesn't know it (that's why they're resetting).
export const resetPasswordSchema = Yup.object({
  newPassword: strongPassword,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
    .required('Please confirm the new password'),
});
