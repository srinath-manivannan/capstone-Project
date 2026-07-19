/**
 * ============================================
 * 📄 WHAT : The React ENTRY POINT — the first frontend file that runs.
 * 🎯 WHY  : Wraps the whole app in its two global providers:
 *           <Provider>          → every component can reach the Redux store
 *           <ColorModeProvider> → every component gets the MUI theme
 * 🔁 FLOW : index.html ➜ THIS FILE ➜ App.tsx ➜ routes/AppRoutes.tsx
 * ============================================
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import { ColorModeProvider } from './theme/Colormodecontext';
import './styles/main.scss';

createRoot(document.getElementById('root')!).render(
  // StrictMode double-runs effects in dev to surface bugs early — keep it on.
  <StrictMode>
    <Provider store={store}>
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
    </Provider>
  </StrictMode>
);
