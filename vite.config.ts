import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { paginasEstaticas } from './plugins/paginasEstaticas';

export default defineConfig({
  plugins: [react(), paginasEstaticas()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
});
