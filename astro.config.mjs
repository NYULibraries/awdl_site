import { defineConfig } from 'astro/config';
import awsAmplify from 'astro-aws-amplify';
import react from '@astrojs/react';
import rehypeExternalLinks from 'rehype-external-links';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	output: 'server',
	adapter: awsAmplify({
		imageService: true
	}),
	integrations: [react(), sitemap()],
	base: '/ancientworld/',
	markdown: {
		rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener'] }]]
	}
});
