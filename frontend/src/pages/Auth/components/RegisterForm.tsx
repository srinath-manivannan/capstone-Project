import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Box, Stack, Grid, TextField, Button, Typography, Link, Alert, InputAdornment, IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { registerSchema } from '../authValidation';
import { registerUser } from '../../../services/authService';
import AuthHeader from './AuthHeader';
import { glassInputSx, authSubmitSx, authLinkSx } from './glassInputSx';

interface Props {
  onLogin: () => void;
}

export default function RegisterForm({ onLogin }: Props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState('');

  const formik = useFormik({
    initialValues: { name: '', email: '', contact: '', password: '', confirmPassword: '' },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setServerError('');
      try {
        const res = await registerUser(values);
        localStorage.setItem('token', res.data.token);
        navigate('/'); // registration logs the user straight in
      } catch (err: any) {
        setServerError(err?.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <AuthHeader title="Create your account" subtitle="It only takes a minute to get started" />

      {serverError && (
        <Alert severity="error" variant="filled" sx={{ mb: 2, borderRadius: 2 }}>
          {serverError}
        </Alert>
      )}

      <Stack spacing={2}>
        <TextField
          fullWidth
          name="name"
          label="Full Name"
          autoComplete="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={(formik.touched.name && formik.errors.name) || ' '}
          sx={glassInputSx}
        />

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

        <TextField
          fullWidth
          name="contact"
          label="Contact Number"
          autoComplete="tel"
          value={formik.values.contact}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.contact && Boolean(formik.errors.contact)}
          helperText={(formik.touched.contact && formik.errors.contact) || ' '}
          sx={glassInputSx}
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={(formik.touched.password && formik.errors.password) || ' '}
              sx={glassInputSx}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((p) => !p)}
                        edge="end"
                        sx={{ color: 'rgba(255,255,255,0.7)' }}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={(formik.touched.confirmPassword && formik.errors.confirmPassword) || ' '}
              sx={glassInputSx}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirm((p) => !p)}
                        edge="end"
                        sx={{ color: 'rgba(255,255,255,0.7)' }}
                      >
                        {showConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid>
      </Stack>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disableElevation
        disabled={formik.isSubmitting}
        sx={authSubmitSx}
      >
        {formik.isSubmitting ? 'Creating account…' : 'Register'}
      </Button>

      <Typography
        variant="body2"
        sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mt: 3 }}
      >
        Already have an account?{' '}
        <Link component="button" type="button" onClick={onLogin} sx={authLinkSx} underline="hover">
          Sign In
        </Link>
      </Typography>
    </Box>
  );
}
