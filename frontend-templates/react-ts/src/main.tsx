/**
 * ============================================
 * 📄 WHAT : The entry point — first file that runs.
 * 🎯 WHY  : Wraps the app in its providers. Here: TodosProvider (the state
 *           layer). Add more providers (theme, auth…) in this one place.
 * 🔁 FLOW : index.html ➜ THIS FILE ➜ App.tsx
 * ============================================
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { TodosProvider } from './context/TodosContext';
import './styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodosProvider>
      <App />
    </TodosProvider>
  </StrictMode>
);
