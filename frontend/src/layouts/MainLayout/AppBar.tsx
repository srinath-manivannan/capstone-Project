import { AppBar as MuiAppBar, Toolbar, IconButton, Typography, Tooltip, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import LogoutIcon from '@mui/icons-material/Logout';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { useColorMode } from '../../theme/useColorMode';

interface Props {
  onToggleSidebar: () => void; // parent (MainLayout) decides what "toggle" means
}

const modeIcon = {
  light: <LightModeIcon fontSize="small" />,
  dark: <DarkModeIcon fontSize="small" />,
  system: <SettingsBrightnessIcon fontSize="small" />,
};

export default function AppBar({ onToggleSidebar }: Props) {
  const { mode, setMode } = useColorMode();
  const navigate = useNavigate();

  // Clicking the theme icon cycles: light -> dark -> system -> light ...
  const cycleMode = useCallback(() => {
    const order: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const next = order[(order.indexOf(mode) + 1) % order.length];
    setMode(next);
  }, [mode, setMode]);

  const dispatch = useAppDispatch();

  // Log out THROUGH Redux: the auth slice clears user + token (and the
  // mirrored localStorage copy), then we navigate to the login screen.
  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/login', { replace: true });
  }, [dispatch, navigate]);

  return (
    <MuiAppBar
      position="fixed" // always stays at the top, even when the page scrolls
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, // sits ABOVE the sidebar
        height: 'var(--appbar-height)',
        justifyContent: 'center',
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <IconButton color="inherit" edge="start" onClick={onToggleSidebar} sx={{ mr: 0.5 }}>
          <MenuIcon />
        </IconButton>

        {/* Brand mark + name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexGrow: 1 }}>
          <Box
            sx={{
              display: 'grid',
              placeItems: 'center',
              width: 34,
              height: 34,
              borderRadius: 2,
              color: '#fff',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            }}
          >
            <RocketLaunchIcon sx={{ fontSize: 20 }} />
          </Box>
          <Typography variant="h6" noWrap sx={{ fontWeight: 700, letterSpacing: '0.01em' }}>
            EMC
          </Typography>
        </Box>

        <Tooltip title={`Theme: ${mode}`}>
          <IconButton color="inherit" onClick={cycleMode}>
            {modeIcon[mode]}
          </IconButton>
        </Tooltip>

        <Tooltip title="Log out">
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </MuiAppBar>
  );
}
