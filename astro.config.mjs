import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import rehypeExternalLinks from 'rehype-external-links';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	output: 'hybrid',
	adapter: netlify(),
	integrations: [react(), sitemap()],
	// base: '/ancientworld', // Removed for Netlify root deployment
	site: 'https://ancwo.netlify.app',
	markdown: {
		rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener'] }]]
	}
	// Redirects removed for Netlify root deployment
});
