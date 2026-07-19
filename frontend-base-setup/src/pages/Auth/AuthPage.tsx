import { useState } from 'react';
import { Box, Fade } from '@mui/material';
import BrandPanel from './components/BrandPanel';
import GlassPanel from './components/GlassPanel';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';

type AuthView = 'login' | 'register' | 'forgot';

/**
 * This is the whole login screen. It does NOT use MainLayout
 * (no AppBar/Sidebar here - it's a full-screen page on its own).
 *
 * `view` decides which of the 3 forms shows inside the glass card.
 * Clicking links inside the forms (e.g. "Forgot password?") just
 * calls setView - no page reload, no route change.
 */
export default function AuthPage() {
  const [view, setView] = useState<AuthView>('login');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)',
        overflow: 'auto',
      }}
    >
      {/* Left side: catchy branding - hidden automatically on mobile */}
      <BrandPanel />

      {/* Right side: the glassy form card, always visible */}
      <Box
        sx={{
          flex: { xs: 1, md: '0 0 480px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 4 },
        }}
      >
        <GlassPanel sx={{ width: '100%', maxWidth: 400, p: { xs: 3, sm: 4 } }}>
          {/* key={view} makes Fade replay its animation every time the form switches */}
          <Fade in key={view} timeout={300}>
            <Box>
              {view === 'login' && (
                <LoginForm
                  onForgotPassword={() => setView('forgot')}
                  onRegister={() => setView('register')}
                />
              )}
              {view === 'register' && <RegisterForm onLogin={() => setView('login')} />}
              {view === 'forgot' && <ForgotPasswordForm onBackToLogin={() => setView('login')} />}
            </Box>
          </Fade>
        </GlassPanel>
      </Box>
    </Box>
  );
}
