import * as Yup from 'yup';

// Same rules as the frontend's authValidation.ts, so a user never sees
// a different error message from the backend than they saw from the form.
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

export const loginSchema = Yup.object({
  email: Yup.string().email('Enter a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email('Enter a valid email address').required('Email is required'),
});