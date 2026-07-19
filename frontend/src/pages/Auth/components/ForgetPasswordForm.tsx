import { useState } from 'react';
import { useFormik } from 'formik';
import { Box, TextField, Button, Typography, Link, Alert } from '@mui/material';
import { forgotPasswordSchema } from '../authValidation';
import { forgotPassword } from '../../../services/authService';
import AuthHeader from './AuthHeader';
import { glassInputSx, authSubmitSx, authLinkSx } from './glassInputSx';

interface Props {
  onBackToLogin: () => void;
}

export default function ForgotPasswordForm({ onBackToLogin }: Props) {
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setServerError('');
      setSuccessMessage('');
      try {
        const res = await forgotPassword(values);
        setSuccessMessage(res.data.message);
      } catch (err: any) {
        setServerError(err?.response?.data?.message || 'Something went wrong. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <AuthHeader
        title="Reset your password"
        subtitle="Enter your email and we’ll send reset instructions"
      />

      {serverError && (
        <Alert severity="error" variant="filled" sx={{ mb: 2, borderRadius: 2 }}>
          {serverError}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" variant="filled" sx={{ mb: 2, borderRadius: 2 }}>
          {successMessage}
        </Alert>
      )}

      <TextField
        fullWidth
        name="email"
        label="Email"
        autoComplete="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={(formik.touched.email && formik.errors.email) || ' '}
        sx={glassInputSx}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disableElevation
        disabled={formik.isSubmitting}
        sx={authSubmitSx}
      >
        {formik.isSubmitting ? 'Sending…' : 'Send Reset Link'}
      </Button>

      <Typography
        variant="body2"
        sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mt: 3 }}
      >
        Remembered it?{' '}
        <Link component="button" type="button" onClick={onBackToLogin} sx={authLinkSx} underline="hover">
          Back to Sign In
        </Link>
      </Typography>
    </Box>
  );
}
