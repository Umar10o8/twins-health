import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Set to '/subfolder/' if the site is not served from the domain root
  base: '/',
});
