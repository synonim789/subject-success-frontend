/// <reference types="vitest"/>
/// <reference  types="vite/client"/>

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      globals: true,
   },
   define: {
      VITE_GOOGLE_CLIENT_ID: JSON.stringify(process.env.VITE_GOOGLE_CLIENT_ID),
      VITE_GOOGLE_REDIRECT_URL: JSON.stringify(
         process.env.VITE_GOOGLE_REDIRECT_UR,
      ),
      VITE_GITHUB_CLIENT_ID: JSON.stringify(process.env.VITE_GITHUB_CLIENT_ID),
      VITE_GITHUB_REDIRECT_URL: JSON.stringify(
         process.env.VITE_GITHUB_REDIRECT_URL,
      ),
      VITE_BACKEND_SERVER_URL: JSON.stringify(
         process.env.VITE_BACKEND_SERVER_URL,
      ),
   },
});
