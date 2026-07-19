/**
 * ============================================
 * 📄 WHAT : The Forgot-Password form — same pattern, plus a SUCCESS message.
 * 🎯 WHY  : Shows how a thunk result that isn't a login (just a message)
 *           flows through the slice and back via a selector.
 * 🔁 FLOW : submit ➜ dispatch(forgotPassword) ➜ thunk ➜ backend
 *           ➜ slice stores forgotMessage ➜ selector shows the Alert
 * ============================================
 */
import { useFormik } from 'formik';
import { Box, TextField, Button, Typography, Link, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { forgotPassword } from '../../../features/auth/authThunks';
import {
  selectAuthLoading,
  selectAuthError,
  selectForgotMessage,
} from '../../../features/auth/authSelectors';
import { forgotPasswordSchema } from '../authValidation';
import AuthHeader from './AuthHeader';
import './ForgetPasswordForm.scss';

interface Props {
  onBackToLogin: () => void;
}

export default function ForgotPasswordForm({ onBackToLogin }: Props) {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectAuthLoading);
  const serverError = useAppSelector(selectAuthError);
  const successMessage = useAppSelector(selectForgotMessage);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      // Fire-and-forget: the slice stores success/error; selectors render it.
      dispatch(forgotPassword(values));
    },
  });

  return (
    <Box component="form" className="forgot-form" onSubmit={formik.handleSubmit} noValidate>
      <AuthHeader
        title="Reset your password"
        subtitle="Enter your email and we’ll send reset instructions"
      />

      {serverError && (
        <Alert severity="error" variant="filled">
          {serverError}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" variant="filled">
          {successMessage}
        </Alert>
      )}

      <TextField
        fullWidth
        className="glass-input"
        name="email"
        label="Email"
        autoComplete="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={(formik.touched.email && formik.errors.email) || ' '}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disableElevation
        className="auth-submit"
        disabled={loading}
      >
        {loading ? 'Sending…' : 'Send Reset Link'}
      </Button>

      <Typography variant="body2" className="auth-form__footer">
        Remembered it?{' '}
        <Link
          component="button"
          type="button"
          className="auth-link"
          onClick={onBackToLogin}
          underline="hover"
        >
          Back to Sign In
        </Link>
      </Typography>
    </Box>
  );
}
