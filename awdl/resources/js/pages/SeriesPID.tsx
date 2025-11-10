import { usePage } from '@inertiajs/react';
import DefaultLayout from '@/layouts/DefaultLayout';
import Content from '@/components/Content';
import Meta from '@/components/Header/Meta';
import SearchHeader from '@/components/Search/Labels/SearchHeader';
import SearchSubheader from '@/components/Search/Labels/SearchSubheader';
import SearchPagination from '@/components/Search/Tools/SearchPagination';
import { type BookItemProps } from '@/types';

export default function SeriesPID() {
  const { data } = usePage().props as unknown as {
    data: {
      pageTitle: string;
      docs: BookItemProps[];
      start: number;
      rows: number;
      numFound: number;
      seriesLabel: string;
    };
  };
  const { pageTitle, docs, start, rows, numFound, seriesLabel } = data;

  const seriesId = Object.keys(docs[0]?.series || {})[0];

  return (
    <DefaultLayout bodyId={`series-page-${seriesId}`}>
      <Meta title={pageTitle as string} />
      <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
        <SearchHeader query='*' seriesLabel={seriesLabel as string} />
        <div className='items-widget'>
          <div className='top'>
            <SearchSubheader />
          </div>
          <div
            id='items'
            className='widget items'
            data-name='items'
            data-rows={rows}
            data-source='https://discovery1.dlib.nyu.edu/solr/viewer/select'
            data-fl='*'
            data-fq-bundle='dlts_book'
            data-fq-sm_collection_code='awdl'
            data-numfound={numFound}
            data-start={start}
            data-docslength={docs.length}
            data-requesterror='0'
          >
            <Content documents={docs as BookItemProps[]} />
          </div>
          <div className='bottom text-center'>
            <SearchPagination rows={rows} />
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
