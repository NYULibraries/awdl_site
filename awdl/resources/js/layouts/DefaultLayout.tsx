import React, { ReactNode, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Meta from '../components/Header/Meta';
import { metatags } from '../components/Header/metatags';

interface DefaultLayoutProps {
	title: string;
	description?: string;
	author?: string;
	bodyID?: string;
	bodyClass?: string;
	children: ReactNode;
}

export default function DefaultLayout({
	title,
	description = metatags.poweredDesc,
	author = metatags.defaultAuthor,
	bodyID = '',
	bodyClass = '',
	children
}: DefaultLayoutProps) {
	useEffect(() => {
		// Load WebFont
		const loadWebFont = async () => {
			try {
				const WebFont = (await import('webfontloader')).default;
				WebFont.load({
					google: {
						families: ['Open Sans:300,400,600']
					},
					active: function () {
						document.documentElement.classList.add('wf-active');
					}
				});
			} catch (error) {
				console.warn('WebFont loader not available:', error);
			}
		};

		loadWebFont();
	}, []);

	return (
		<>
			<Meta title={title} description={description} author={author} />
			<div id="skipnav">
				<a href="#mainContent">Skip navigation</a>
			</div>
			<Header />
			<main id={bodyID} className={bodyClass}>
				{children}
			</main>
			<Footer />
		</>
	);
}
