/**
 * ============================================
 * 📄 WHAT : The ColorModeProvider — owns the light/dark/system choice.
 * 🎯 WHY  : Wraps the whole app ONCE (in main.tsx): every component gets the
 *           MUI theme, and the user's choice survives visits (localStorage —
 *           allowed here: it's a UI preference, not app data).
 *           The context + hook live in useColorMode.ts (components-only file
 *           rule, enforced by ESLint's react-refresh check).
 * 🔁 FLOW : main.tsx ➜ THIS FILE ➜ ThemeProvider ➜ every component
 * ============================================
 */
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { getTheme } from './theme';
import { ColorModeContext, type ThemeMode } from './useColorMode';

const STORAGE_KEY = 'app-theme-mode';

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

  const value = useMemo(() => ({ mode, resolvedMode, setMode: setModeState }), [mode, resolvedMode]);

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* resets browser default styles + applies background color */}
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
