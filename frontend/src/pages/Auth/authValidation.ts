import * as Yup from 'yup';

// Shared password rule so Login/Register both use the exact same standard
const passwordRules = Yup.string()
  .required('Password is required')
  .min(8, 'Must be at least 8 characters')
  .matches(/[A-Z]/, 'Add at least one uppercase letter')
  .matches(/[a-z]/, 'Add at least one lowercase letter')
  .matches(/[0-9]/, 'Add at least one number')
  .matches(/[^A-Za-z0-9]/, 'Add at least one special character');

export const loginSchema = Yup.object({
  email: Yup.string().email('Enter a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const registerSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Name is too short').required('Name is required'),
  email: Yup.string().email('Enter a valid email address').required('Email is required'),
  contact: Yup.string()
    .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number')
    .required('Contact number is required'),
  password: passwordRules,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email('Enter a valid email address').required('Email is required'),
});