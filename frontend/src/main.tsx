import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ColorModeProvider } from './theme/Colormodecontext';
import './styles/responsive.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  </StrictMode>
);