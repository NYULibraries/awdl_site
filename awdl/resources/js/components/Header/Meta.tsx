import React from 'react';
import { Head } from '@inertiajs/react';
import { metatags } from './metatags';

interface MetaProps {
	title?: string;
	description?: string;
	author?: string;
}

export default function Meta({ 
	title, 
	description = metatags.poweredDesc, 
	author = metatags.defaultAuthor 
}: MetaProps) {
	const pageTitle = title 
		? `${title} - Ancient World Digital Library Collection - NYU Libraries`
		: 'Ancient World Digital Library Collection - NYU Libraries';

	return (
		<Head>
			<title>{pageTitle}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width,initial-scale=1" />
			<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
			<meta name="title" content={metatags.siteName} />
			<meta name="description" content={description} />
			<meta name="author" content={author} />
			<meta property="og:site_name" content={metatags.siteName} />
			<meta property="og:title" content={metatags.siteName} />
			<meta property="og:description" content={metatags.poweredDesc} />
			<meta property="og:type" content={metatags.type} />
			<meta property="og:url" content="" />
			<link rel="icon" type="image/x-icon" href="/favicon.ico" />
			<link rel="sitemap" href="/sitemap-index.xml" />
		</Head>
	);
}
