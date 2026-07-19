import { useCallback, useMemo } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { navItems } from './navItems';

interface Props {
  open: boolean;          // expanded (true) or collapsed-to-icons (false) — desktop/tablet only
  isMobile: boolean;       // are we on a small screen?
  mobileOpen: boolean;     // is the overlay sidebar open on mobile?
  onCloseMobile: () => void;
}

export default function Sidebar({ open, isMobile, mobileOpen, onCloseMobile }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  // Stable click handler shared by every nav button
  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
      if (isMobile) onCloseMobile();
    },
    [navigate, isMobile, onCloseMobile]
  );

  // The actual list of nav buttons — shared between mobile and desktop versions.
  // Memoized so it only rebuilds when something it depends on actually changes.
  const navList = useMemo(
    () => (
    <Box sx={{ mt: isMobile ? 0 : 'var(--appbar-height)', overflowX: 'hidden' }}>
      <List>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isSelected = location.pathname === item.path;

          const button = (
            <ListItemButton
              selected={isSelected}
              onClick={() => handleNavigate(item.path)}
              sx={{
                justifyContent: open ? 'flex-start' : 'center',
                px: 2.5,
                minHeight: 48,
              }}
            >
              <ListItemIcon
                sx={{ minWidth: 0, mr: open ? 2 : 0, justifyContent: 'center' }}
              >
                <Icon />
              </ListItemIcon>
              {/* Only show the page name when expanded */}
              {open && <ListItemText primary={item.label} />}
            </ListItemButton>
          );

          // When collapsed, wrap in a Tooltip so the name still shows on hover
          return open ? (
            <div key={item.path}>{button}</div>
          ) : (
            <Tooltip title={item.label} placement="right" key={item.path}>
              {button}
            </Tooltip>
          );
        })}
      </List>
    </Box>
    ),
    [isMobile, open, location.pathname, handleNavigate]
  );

  // MOBILE: sidebar is a temporary overlay that covers content (closes after picking a page)
  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onCloseMobile}
        ModalProps={{ keepMounted: true }} // better performance on re-open
        sx={{
          '& .MuiDrawer-paper': {
            width: 'var(--sidebar-width-expanded)',
            boxSizing: 'border-box',
          },
        }}
      >
        {navList}
      </Drawer>
    );
  }

  // DESKTOP / TABLET: sidebar is always visible, just changes WIDTH (never fully closes)
  const width = open ? 'var(--sidebar-width-expanded)' : 'var(--sidebar-width-collapsed)';

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: (theme) =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        '& .MuiDrawer-paper': {
          width,
          overflowX: 'hidden',
          boxSizing: 'border-box',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      {navList}
    </Drawer>
  );
}