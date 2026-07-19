import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { getTheme } from './theme';

type ThemeMode = 'light' | 'dark' | 'system';

interface ColorModeContextType {
  mode: ThemeMode;               // what the user picked: light / dark / system
  resolvedMode: 'light' | 'dark'; // what is actually shown right now
  setMode: (mode: ThemeMode) => void;
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);
const STORAGE_KEY = 'app-theme-mode';

/**
 * Wrap your whole app with this ONE time (in main.tsx).
 * It gives every component access to the current theme mode,
 * and remembers the user's choice between visits (localStorage).
 */
export function ColorModeProvider({ children }: { children: ReactNode }) {
  // Detects the OS/browser's own dark mode setting
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    return saved ?? 'system';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  // If the user picked "system", follow the OS. Otherwise use their exact pick.
  const resolvedMode: 'light' | 'dark' =
    mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : mode;

  // Only rebuild the theme object when the resolved mode actually changes
  const theme = useMemo(() => getTheme(resolvedMode), [resolvedMode]);

  const value = useMemo(
    () => ({ mode, resolvedMode, setMode: setModeState }),
    [mode, resolvedMode]
  );

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* resets browser default styles + applies background color */}
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// Hook every component will use: const { mode, setMode } = useColorMode();
export function useColorMode() {
  const ctx = useContext(ColorModeContext);
  if (!ctx) throw new Error('useColorMode must be used inside <ColorModeProvider>');
  return ctx;
}
