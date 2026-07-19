/**
 * ============================================
 * 📄 WHAT : The Register form — same pattern as LoginForm, more fields.
 * 🎯 WHY  : Every form is the SAME shape: formik + Yup ➜ dispatch(thunk)
 *           ➜ read loading/error via selectors. Nothing else.
 * 🔁 FLOW : submit ➜ dispatch(registerUser) ➜ thunk ➜ backend ➜ slice
 *           ➜ selectors re-render ➜ navigate('/')
 * ============================================
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Box,
  Stack,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { registerUser } from '../../../features/auth/authThunks';
import { selectAuthLoading, selectAuthError } from '../../../features/auth/authSelectors';
import { registerSchema } from '../authValidation';
import AuthHeader from './AuthHeader';
import './RegisterForm.scss';

interface Props {
  onLogin: () => void;
}

export default function RegisterForm({ onLogin }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectAuthLoading);
  const serverError = useAppSelector(selectAuthError);

  // UI-only state stays local.
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: { name: '', email: '', contact: '', password: '', confirmPassword: '' },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const result = await dispatch(registerUser(values));
      if (registerUser.fulfilled.match(result)) {
        navigate('/'); // registration logs the user straight in
      }
    },
  });

  return (
    <Box component="form" className="register-form" onSubmit={formik.handleSubmit} noValidate>
      <AuthHeader title="Create your account" subtitle="It only takes a minute to get started" />

      {serverError && (
        <Alert severity="error" variant="filled">
          {serverError}
        </Alert>
      )}

      <Stack spacing={2}>
        <TextField
          fullWidth
          className="glass-input"
          name="name"
          label="Full Name"
          autoComplete="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={(formik.touched.name && formik.errors.name) || ' '}
        />

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

        <TextField
          fullWidth
          className="glass-input"
          name="contact"
          label="Contact Number"
          autoComplete="tel"
          value={formik.values.contact}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.contact && Boolean(formik.errors.contact)}
          helperText={(formik.touched.contact && formik.errors.contact) || ' '}
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              className="glass-input"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={(formik.touched.password && formik.errors.password) || ' '}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((p) => !p)} edge="end">
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
              className="glass-input"
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={(formik.touched.confirmPassword && formik.errors.confirmPassword) || ' '}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirm((p) => !p)} edge="end">
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
        className="auth-submit"
        disabled={loading}
      >
        {loading ? 'Creating account…' : 'Register'}
      </Button>

      <Typography variant="body2" className="auth-form__footer">
        Already have an account?{' '}
        <Link
          component="button"
          type="button"
          className="auth-link"
          onClick={onLogin}
          underline="hover"
        >
          Sign In
        </Link>
      </Typography>
    </Box>
  );
}
