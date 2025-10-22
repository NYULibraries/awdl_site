import React, { ReactNode } from 'react';
import Header from '../components/Header/Header';
import Meta from '../components/Header/Meta';
import { metatags } from '../components/Header/metatags';

interface BookLayoutProps {
	title: string;
	description?: string;
	author?: string;
	children: ReactNode;
}

export default function BookLayout({
	title,
	description = metatags.poweredDesc,
	author = metatags.defaultAuthor,
	children
}: BookLayoutProps) {
	return (
		<>
			<Meta title={title} description={description} author={author} />
			<div id="skipnav">
				<a href="#mainContent">Skip navigation</a>
			</div>
			<Header />
			<main id="book">
				{children}
			</main>
		</>
	);
}
