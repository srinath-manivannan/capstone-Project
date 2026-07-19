/**
 * ============================================
 * 📄 WHAT : The color-mode CONTEXT + the useColorMode() hook.
 * 🎯 WHY  : Kept in its own (non-component) file so React Fast Refresh works:
 *           a file should export EITHER components OR helpers, not both —
 *           our own ESLint gate enforces this.
 * 🔁 FLOW : Colormodecontext.tsx (provider sets the value) ➜ THIS FILE ➜
 *           any component calling useColorMode()
 * ============================================
 */
import { createContext, useContext } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ColorModeContextType {
  mode: ThemeMode; //              what the user picked: light / dark / system
  resolvedMode: 'light' | 'dark'; // what is actually shown right now
  setMode: (mode: ThemeMode) => void;
}

export const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

// Hook every component uses: const { mode, setMode } = useColorMode();
export function useColorMode() {
  const ctx = useContext(ColorModeContext);
  if (!ctx) throw new Error('useColorMode must be used inside <ColorModeProvider>');
  return ctx;
}
