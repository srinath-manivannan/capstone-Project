import { useState } from 'react';
import { Box, Fade } from '@mui/material';
import BrandPanel from './components/BrandPannel';
import GlassPanel from './components/GlassPanel';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgetPasswordForm';

type AuthView = 'login' | 'register' | 'forgot';

/**
 * The whole login screen. It does NOT use MainLayout (no AppBar/Sidebar) —
 * it's a full-screen split layout: brand story on the left, glass form card
 * on the right. `view` decides which of the 3 forms shows inside the card;
 * switching views is pure state (no route change, no reload).
 */
export default function AuthPage() {
  const [view, setView] = useState<AuthView>('login');

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #db2777 100%)',
      }}
    >
      {/* Soft decorative glows for depth behind the glass */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: '-20%',
          right: '18%',
          width: 460,
          height: 460,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(219,39,119,0.35), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Left: brand story — hidden on small screens */}
      <BrandPanel />

      {/* Right: the glass form card, always visible and centered */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          flex: { xs: 1, md: '0 0 520px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 4 },
        }}
      >
        <GlassPanel sx={{ width: '100%', maxWidth: 420, p: { xs: 3, sm: 4.5 } }}>
          {/* key={view} replays the Fade every time the form switches */}
          <Fade in key={view} timeout={350}>
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
