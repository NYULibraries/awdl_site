import { defineConfig } from 'astro/config';
import awsAmplify from 'astro-aws-amplify';
import react from '@astrojs/react';
import rehypeExternalLinks from 'rehype-external-links';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	output: 'hybrid',
	adapter: awsAmplify(),
	integrations: [react(), sitemap()],
	// base: '/ancientworld',
	site: 'https://ancientworld-astro.d6kpomg5jv6rf.amplifyapp.com/',
	markdown: {
		rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener'] }]]
	}
	// redirects: {
	// 	'/favicon.ico': '/ancientworld/favicon.ico',
	// 	'/robots.txt': '/ancientworld/robots.txt',
	// 	'/sitemap-index.xml': '/ancientworld/sitemap-index.xml'
	// }
});
