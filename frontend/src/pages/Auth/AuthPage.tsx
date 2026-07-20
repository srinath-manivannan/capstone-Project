/**
 * ============================================
 * 📄 WHAT : The full-screen login screen (no AppBar/Sidebar here).
 * 🎯 WHY  : `view` decides which of the 3 forms shows inside the glass card.
 *           Switching views is pure LOCAL state (allowed: it's UI-only state,
 *           not server data) — no route change, no reload.
 * 🔁 FLOW : routes/AppRoutes.tsx (/login) ➜ THIS FILE ➜ Login/Register/Forgot forms
 * ============================================
 */
import { useState, useCallback } from 'react';
import { Box, Fade } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { clearAuthError } from '../../features/auth/authSlice';
import BrandPanel from './components/BrandPannel';
import GlassPanel from './components/GlassPanel';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgetPasswordForm';
import './AuthPage.scss';

type AuthView = 'login' | 'register' | 'forgot';

export default function AuthPage() {
  const [view, setView] = useState<AuthView>('login');
  const dispatch = useAppDispatch();

  // Changing forms also clears any old error/success message from Redux,
  // so the Register form never shows a stale Login error.
  const changeView = useCallback(
    (next: AuthView) => {
      dispatch(clearAuthError());
      setView(next);
    },
    [dispatch]
  );

  return (
    <Box className="auth-page">
      {/* Left: deep brand panel — hidden below 900px (see BrandPanel.scss) */}
      <BrandPanel />

      {/* Right: the glass form card */}
      <Box className="auth-page__card-col">
        <GlassPanel>
          {/* key={view} replays the fade each time the form switches */}
          <Fade in key={view} timeout={350}>
            <Box>
              {view === 'login' && (
                <LoginForm
                  onForgotPassword={() => changeView('forgot')}
                  onRegister={() => changeView('register')}
                />
              )}
              {view === 'register' && <RegisterForm onLogin={() => changeView('login')} />}
              {view === 'forgot' && (
                <ForgotPasswordForm onBackToLogin={() => changeView('login')} />
              )}
            </Box>
          </Fade>
        </GlassPanel>
      </Box>
    </Box>
  );
}
