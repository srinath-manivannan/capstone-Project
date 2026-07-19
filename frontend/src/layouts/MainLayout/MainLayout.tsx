import { useCallback, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
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
          minWidth: 0, // lets content shrink instead of forcing horizontal overflow
          mt: 'var(--appbar-height)',
          // NOTE: no margin-left here. The permanent Sidebar already reserves its
          // width in the flex row, so the content sits right beside it. Adding a
          // margin here as well was double-offsetting everything to one side.
          p: { xs: 2, sm: 3 }, // less padding on phones, more on desktop
        }}
      >
        {/* A plain, centered content region (max-width for readable line
            lengths on wide monitors). Each PAGE brings its own cards, so a
            dashboard can show many cards instead of being trapped in one. */}
        <Box sx={{ maxWidth: 1320, mx: 'auto', width: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}