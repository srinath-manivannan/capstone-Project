import { useState } from 'react';
import { useFormik } from 'formik';
import { Box, TextField, Button, Typography, Link, Alert } from '@mui/material';
import { forgotPasswordSchema } from '../authValidation';
import { forgotPassword } from '../../../services/authService';
import { glassInputSx } from './glassInputSx';

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
      <Typography variant="h5" fontWeight={700} color="#fff" gutterBottom>
        Reset your password
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
        Enter your email and we&apos;ll send you reset instructions
      </Typography>

      {serverError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {serverError}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <TextField
        fullWidth
        name="email"
        label="Email"
        margin="normal"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={glassInputSx}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={formik.isSubmitting}
        sx={{ mt: 3, mb: 2, py: 1.3 }}
      >
        {formik.isSubmitting ? 'Sending...' : 'Send Reset Link'}
      </Button>

      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
        Remembered it?{' '}
        <Link
          component="button"
          type="button"
          onClick={onBackToLogin}
          sx={{ color: '#fff', fontWeight: 600 }}
          underline="hover"
        >
          Back to Sign In
        </Link>
      </Typography>
    </Box>
  );
}
