import { AppBar as MuiAppBar, Toolbar, IconButton, Typography, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { useColorMode } from '../../theme/ColorModeContext';

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

  // Clicking the theme icon cycles: light -> dark -> system -> light ...
  const cycleMode = () => {
    const order: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const next = order[(order.indexOf(mode) + 1) % order.length];
    setMode(next);
  };

  return (
    <MuiAppBar
      position="fixed" // always stays at the top, even when the page scrolls
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, // sits ABOVE the sidebar
        height: 'var(--appbar-height)',
        justifyContent: 'center',
      }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onToggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          My App
        </Typography>

        <Tooltip title={`Theme: ${mode}`}>
          <IconButton color="inherit" onClick={cycleMode}>
            {modeIcon[mode]}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </MuiAppBar>
  );
}
