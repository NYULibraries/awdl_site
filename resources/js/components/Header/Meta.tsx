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
  author = metatags.defaultAuthor,
}: MetaProps) {
  const pageTitle = title ? `${title} - ${import.meta.env.VITE_APP_NAME}` : `${import.meta.env.VITE_APP_NAME}`;
  const pageUrl = typeof window !== 'undefined' ? window.location.href : 'https://awdl.dlib.nyu.edu/';

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width,initial-scale=1' />
      <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
      <meta name='title' content={metatags.siteName} />
      <meta name='description' content={description} />
      <meta name='author' content={author} />
      <meta property='og:site_name' content={metatags.siteName} />
      <meta property='og:title' content={metatags.siteName} />
      <meta property='og:description' content={metatags.poweredDesc} />
      <meta property='og:type' content={metatags.type} />
      <meta property='og:url' content={pageUrl} />
      <link rel='icon' type='image/x-icon' href='/favicon.ico' />
      <link rel='sitemap' href='/sitemap-index.xml' />
    </Head>
  );
}
