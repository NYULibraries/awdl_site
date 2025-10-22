import React, { ReactNode, useEffect } from 'react';
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
  children,
}: BookLayoutProps) {
  useEffect(() => {
    // Load WebFont
    const loadWebFont = async () => {
      try {
        const WebFont = (await import('webfontloader')).default;
        WebFont.load({
          google: {
            families: ['Open Sans:300,400,600'],
          },
          active: function () {
            document.documentElement.classList.add('wf-active');
          },
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
      <div id='skipnav'>
        <a href='#mainContent'>Skip navigation</a>
      </div>
      <Header />
      <main id='book'>{children}</main>
    </>
  );
}
