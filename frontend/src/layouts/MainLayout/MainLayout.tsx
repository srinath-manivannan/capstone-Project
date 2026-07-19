import { useCallback, useState } from 'react';
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import Sidebar from './Sidebar';

/**
 * The ONE layout every page shares: fixed AppBar + fixed Sidebar + dynamic content.
 * <Outlet /> is where React Router injects whatever page you navigated to —
 * that's what makes the content "dynamic" while AppBar/Sidebar stay put.
 */
export default function MainLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 600px

  const [open, setOpen] = useState(true);        // expanded/collapsed, desktop & tablet
  const [mobileOpen, setMobileOpen] = useState(false); // overlay open/closed, mobile only

  const handleToggleSidebar = useCallback(() => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setOpen((prev) => !prev);
    }
  }, [isMobile]);

  const handleCloseMobile = useCallback(() => setMobileOpen(false), []);

  const sidebarWidth = isMobile
    ? '0px'
    : open
    ? 'var(--sidebar-width-expanded)'
    : 'var(--sidebar-width-collapsed)';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar onToggleSidebar={handleToggleSidebar} />

      <Sidebar
        open={open}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        onCloseMobile={handleCloseMobile}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 'var(--appbar-height)',
          ml: sidebarWidth, // content shifts right by exactly the sidebar's current width
          transition: (t) =>
            t.transitions.create('margin-left', {
              easing: t.transitions.easing.sharp,
              duration: t.transitions.duration.enteringScreen,
            }),
          p: { xs: 2, sm: 3 }, // less padding on phones, more on desktop
        }}
      >
        {/* Every page's content lives inside this Paper — gives it a
            consistent card background + shadow, and keeps spacing
            identical no matter which page you're on. */}
        <Paper
          elevation={1}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            minHeight: 'calc(100vh - var(--appbar-height) - 48px)',
          }}
        >
          <Outlet />
        </Paper>
      </Box>
    </Box>
  );
}