import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite = the dev server + bundler. This is all the config a template needs.
export default defineConfig({
  plugins: [react()],
});
