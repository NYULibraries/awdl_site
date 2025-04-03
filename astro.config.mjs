import { defineConfig } from 'astro/config';
import awsAmplify from 'astro-aws-amplify';
import react from '@astrojs/react';

export default defineConfig({
  output: 'hybrid',
  adapter: awsAmplify(),
  integrations: [react()],
  base: '/ancientworld/',
  vite: {
    build: {
      rollupOptions: {
        external: ['@rollup/rollup-linux-x64-gnu'],
      },
    },
  },
});
