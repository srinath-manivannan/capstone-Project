import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Box, TextField, Button, Typography, Link, Alert, InputAdornment, IconButton, Grid,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { registerSchema } from '../authValidation';
import { registerUser } from '../../../services/authService';
import { glassInputSx } from './glassInputSx';

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
      <Typography variant="h5" fontWeight={700} color="#fff" gutterBottom>
        Create your account
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
        It only takes a minute
      </Typography>

      {serverError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {serverError}
        </Alert>
      )}

      <TextField
        fullWidth
        name="name"
        label="Full Name"
        margin="normal"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        sx={glassInputSx}
      />

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
        name="contact"
        label="Contact Number"
        margin="normal"
        value={formik.values.contact}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.contact && Boolean(formik.errors.contact)}
        helperText={formik.touched.contact && formik.errors.contact}
        sx={glassInputSx}
      />

      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
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
            InputProps={{
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
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirm ? 'text' : 'password'}
            margin="normal"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            sx={glassInputSx}
            InputProps={{
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
            }}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={formik.isSubmitting}
        sx={{ mt: 3, mb: 2, py: 1.3 }}
      >
        {formik.isSubmitting ? 'Creating account...' : 'Register'}
      </Button>

      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
        Already have an account?{' '}
        <Link
          component="button"
          type="button"
          onClick={onLogin}
          sx={{ color: '#fff', fontWeight: 600 }}
          underline="hover"
        >
          Sign In
        </Link>
      </Typography>
    </Box>
  );
}
