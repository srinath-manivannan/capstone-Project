/**
 * ============================================
 * 📄 WHAT : Yup VALIDATION SCHEMAS for the auth endpoints.
 * 🎯 WHY  : The rules for "what is acceptable input" live in their own file —
 *           routes plug them in via validateRequest(schema). Keeping them
 *           separate from controllers = SRP; reusing one schema on several
 *           routes = DRY.
 * 🔁 FLOW : routes/auth.routes.ts ➜ validateRequest(THIS) ➜ controller
 * ============================================
 *
 * Mirrors the frontend's authValidation.ts so users never see a different
 * error from the backend than the form already told them.
 */
import * as Yup from 'yup';

// POST /api/auth/register
export const registerSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Name is too short').required('Name is required'),
  email: Yup.string().email('Enter a valid email address').required('Email is required'),
  contact: Yup.string()
    .matches(/^[0-9]{10}$/, 'Contact must be a valid 10-digit number')
    .required('Contact number is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});

// POST /api/auth/login
export const loginSchema = Yup.object({
  email: Yup.string().email('Enter a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

// POST /api/auth/forgot-password
export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email('Enter a valid email address').required('Email is required'),
});
