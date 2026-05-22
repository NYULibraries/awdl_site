import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    origin: 'https://awdl-site.ddev.site:5173',
    cors: {
      origin: 'https://awdl-site.ddev.site',
    },
    hmr: {
      host: 'awdl-site.ddev.site',
      protocol: 'wss',
      clientPort: 5173,
    },
  },
  plugins: [
    laravel({
      input: ['resources/js/app.tsx', 'resources/sass/style.scss'],
      ssr: 'resources/js/ssr.tsx',
      refresh: true,
    }),
    react(),
  ],
  optimizeDeps: {},
  esbuild: {
    jsx: 'automatic',
  },
  resolve: {
    alias: {
      'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
    },
  },
});
