/**
 * ============================================
 * 📄 WHAT : The entry point — first file that runs.
 * 🎯 WHY  : <Provider store> makes the Redux store reachable from every
 *           component. Add more providers (theme, router…) in this one place.
 * 🔁 FLOW : index.html ➜ THIS FILE ➜ App.tsx
 * ============================================
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import './styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
