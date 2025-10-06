import { defineConfig } from 'astro/config';
import awsAmplify from 'astro-aws-amplify';
import react from '@astrojs/react';
import rehypeExternalLinks from 'rehype-external-links';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	output: 'hybrid',
	adapter: awsAmplify({
		runtime: 'nodejs20.x'
	}),
	integrations: [react(), sitemap()],
	base: '/ancientworld',
	site: 'https://awdl.dlib.nyu.edu',
	markdown: {
		rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener'] }]]
	},
	redirects: {
		'/favicon.ico': '/ancientworld/favicon.ico',
		'/robots.txt': '/ancientworld/robots.txt',
		'/sitemap-index.xml': '/ancientworld/sitemap-index.xml'
	}
});
