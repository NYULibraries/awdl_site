import { defineConfig } from 'astro/config';
import awsAmplify from 'astro-aws-amplify';
import react from '@astrojs/react';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
	output: 'hybrid',
	adapter: awsAmplify(),
	integrations: [react()],
	base: '/ancientworld/',
	markdown: {
		rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener'] }]]
	}
});
