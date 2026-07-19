import { createTheme, type ThemeOptions } from '@mui/material/styles';

// One shared typography setup for both light and dark themes.
// 'Inter' is loaded from Google Fonts in index.html.
const typography = {
  fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
  h1: { fontWeight: 700 },
  h2: { fontWeight: 700 },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
  button: { textTransform: 'none' as const }, // buttons show "Save" not "SAVE"
};

/**
 * Returns a full MUI theme for the given mode.
 * Called every time the user switches light/dark/system.
 */
export function getTheme(mode: 'light' | 'dark') {
  const options: ThemeOptions = {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: { default: '#f4f6f8', paper: '#ffffff' },
            primary: { main: '#1976d2' },
            divider: '#e0e0e0',
          }
        : {
            background: { default: '#121212', paper: '#1e1e1e' },
            primary: { main: '#90caf9' },
            divider: '#2c2c2c',
          }),
    },
    typography,
    shape: {
      borderRadius: 8, // rounded corners app-wide (cards, buttons, Paper)
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' }, // avoids MUI's dark-mode overlay gradient
        },
      },
    },
  };

  return createTheme(options);
}
