import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Box, TextField, Button, Typography, Link, Alert, InputAdornment, IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { loginSchema } from '../authValidation';
import { loginUser } from '../../../services/authService';
import { glassInputSx } from './glassInputSx';

interface Props {
  onForgotPassword: () => void;
  onRegister: () => void;
}

export default function LoginForm({ onForgotPassword, onRegister }: Props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setServerError('');
      try {
        const res = await loginUser(values);
        localStorage.setItem('token', res.data.token);
        navigate('/'); // go to the dashboard after successful login
      } catch (err: any) {
        setServerError(err?.response?.data?.message || 'Login failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#fff' }}>
        Welcome back
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
        Sign in to continue
      </Typography>

      {serverError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {serverError}
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

      <TextField
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        margin="normal"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
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

      <Box sx={{ textAlign: 'right', mt: 1 }}>
        <Link
          component="button"
          type="button"
          onClick={onForgotPassword}
          sx={{ color: 'rgba(255,255,255,0.8)' }}
          underline="hover"
        >
          Forgot password?
        </Link>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={formik.isSubmitting}
        sx={{ mt: 3, mb: 2, py: 1.3 }}
      >
        {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>

      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
        Don&apos;t have an account?{' '}
        <Link
          component="button"
          type="button"
          onClick={onRegister}
          sx={{ color: '#fff', fontWeight: 600 }}
          underline="hover"
        >
          Register
        </Link>
      </Typography>
    </Box>
  );
}