/**
 * ============================================
 * 📄 WHAT : The Login form — ⭐ THE MODEL for every form in the app.
 * 🎯 WHY  : Notice what this component does NOT do: no axios, no API URLs,
 *           no token handling. It only (1) collects input, (2) dispatches a
 *           thunk, (3) reads loading/error from Redux via selectors.
 * 🔁 FLOW : user submits ➜ dispatch(loginUser) ➜ features/auth/authThunks.ts
 *           ➜ api/client.ts ➜ backend ➜ authSlice stores token/user
 *           ➜ selectors re-render this form ➜ navigate('/')
 * ============================================
 *
 * Local state policy: ONLY pure-UI state may be local (showPassword).
 * Server state (loading, error, user) always lives in Redux.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Box,
  Stack,
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
import { loginUser } from '../../../features/auth/authThunks';
import { selectAuthLoading, selectAuthError } from '../../../features/auth/authSelectors';
import { loginSchema } from '../authValidation';
import AuthHeader from './AuthHeader';
import './LoginForm.scss';

interface Props {
  onForgotPassword: () => void;
  onRegister: () => void;
}

export default function LoginForm({ onForgotPassword, onRegister }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // READ from Redux — never duplicated into useState.
  const loading = useAppSelector(selectAuthLoading);
  const serverError = useAppSelector(selectAuthError);

  // UI-only state — allowed to be local.
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      // WRITE via dispatch. `.fulfilled.match` = "did this thunk succeed?"
      const result = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(result)) {
        navigate('/'); // token is already in Redux (+ mirrored for refresh)
      }
      // On failure we do nothing here — the slice stored the error and the
      // <Alert> below re-renders automatically. That's Redux doing its job.
    },
  });

  return (
    <Box component="form" className="login-form" onSubmit={formik.handleSubmit} noValidate>
      <AuthHeader title="Welcome back" subtitle="Sign in to continue to your dashboard" />

      {serverError && (
        <Alert severity="error" variant="filled">
          {serverError}
        </Alert>
      )}

      <Stack spacing={2}>
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
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
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
      </Stack>

      <div className="auth-form__forgot-row">
        <Link component="button" type="button" onClick={onForgotPassword} underline="hover">
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disableElevation
        className="auth-submit"
        disabled={loading}
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </Button>

      <Typography variant="body2" className="auth-form__footer">
        Don&apos;t have an account?{' '}
        <Link
          component="button"
          type="button"
          className="auth-link"
          onClick={onRegister}
          underline="hover"
        >
          Register
        </Link>
      </Typography>
    </Box>
  );
}
