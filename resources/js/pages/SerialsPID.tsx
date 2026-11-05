import { usePage } from '@inertiajs/react';
import DefaultLayout from '@/layouts/DefaultLayout';
import Content from '@/components/Content';
import Meta from '@/components/Header/Meta';
import SearchHeader from '@/components/Search/Labels/SearchHeader';
import SearchSubheader from '@/components/Search/Labels/SearchSubheader';
import SearchPagination from '@/components/Search/Tools/SearchPagination';
import { type BookItemProps } from '@/types';

export default function SerialsPID() {
  const { data } = usePage().props as unknown as {
    data: {
      pageTitle: string;
      docs: BookItemProps[];
      start: number;
      rows: number;
      numFound: number;
      serialLabel: string;
    };
  };
  const { pageTitle, docs, start, rows, numFound, serialLabel } = data;

  return (
    <DefaultLayout bodyId='serials-page'>
      <Meta title={pageTitle} />
      <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
        <SearchHeader query='*' seriesLabel={serialLabel} />
        <div className='items-widget'>
          <div className='top'>
            <SearchSubheader />
          </div>
          <div
            id='items'
            className='widget items'
            data-name='items'
            data-rows={rows}
            data-numfound={numFound}
            data-start={start}
            data-docslength={docs.length}
          >
            <Content documents={docs} />
          </div>
          <div className='bottom text-center'>
            <SearchPagination rows={rows} />
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
