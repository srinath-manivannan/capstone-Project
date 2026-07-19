import { createTheme, type ThemeOptions } from '@mui/material/styles';

// One shared typography setup for both light and dark themes.
// 'Inter' is loaded from Google Fonts in index.html.
const typography = {
  fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
  h1: { fontWeight: 800, letterSpacing: '-0.02em' },
  h2: { fontWeight: 800, letterSpacing: '-0.02em' },
  h3: { fontWeight: 700, letterSpacing: '-0.02em' },
  h4: { fontWeight: 700, letterSpacing: '-0.01em' },
  h5: { fontWeight: 700, letterSpacing: '-0.01em' },
  h6: { fontWeight: 600 },
  subtitle1: { fontWeight: 600 },
  button: { textTransform: 'none' as const, fontWeight: 600 }, // buttons show "Save" not "SAVE"
};

// Brand palette — the indigo → purple used on the auth screen, so the whole
// app feels like one product.
const brand = {
  indigo: '#4f46e5',
  indigoDark: '#4338ca',
  indigoLight: '#a5b4fc',
  purple: '#7c3aed',
};

/**
 * Returns a full MUI theme for the given mode.
 * Called every time the user switches light/dark/system.
 */
export function getTheme(mode: 'light' | 'dark') {
  const isLight = mode === 'light';

  const options: ThemeOptions = {
    palette: {
      mode,
      ...(isLight
        ? {
            background: { default: '#f5f6fa', paper: '#ffffff' },
            primary: { main: brand.indigo, dark: brand.indigoDark, contrastText: '#fff' },
            secondary: { main: brand.purple },
            divider: 'rgba(15,23,42,0.08)',
            text: { primary: '#1e293b', secondary: '#64748b' },
          }
        : {
            background: { default: '#0f1115', paper: '#181a20' },
            primary: { main: brand.indigoLight, dark: brand.indigo, contrastText: '#0f1115' },
            secondary: { main: '#c4b5fd' },
            divider: 'rgba(255,255,255,0.08)',
            text: { primary: '#e6e8ee', secondary: '#9aa3b2' },
          }),
    },
    typography,
    shape: {
      borderRadius: 10, // rounded corners app-wide (cards, buttons, Paper)
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' }, // avoids MUI's dark-mode overlay gradient
        },
      },
      MuiAppBar: {
        defaultProps: { color: 'inherit' },
        styleOverrides: {
          root: {
            backgroundColor: isLight ? 'rgba(255,255,255,0.85)' : 'rgba(24,26,32,0.85)',
            backdropFilter: 'blur(8px)',
            borderBottom: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: 'none',
            color: isLight ? '#1e293b' : '#e6e8ee',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            border: 'none',
            borderRight: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)'}`,
            backgroundColor: isLight ? '#ffffff' : '#181a20',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            marginBottom: 4,
            '&.Mui-selected': {
              backgroundColor: isLight ? 'rgba(79,70,229,0.10)' : 'rgba(165,180,252,0.14)',
              color: isLight ? brand.indigo : brand.indigoLight,
              '& .MuiListItemIcon-root': { color: 'inherit' },
              '&:hover': {
                backgroundColor: isLight ? 'rgba(79,70,229,0.16)' : 'rgba(165,180,252,0.20)',
              },
            },
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 10 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            border: `1px solid ${isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.06)'}`,
          },
        },
      },
    },
  };

  return createTheme(options);
}
