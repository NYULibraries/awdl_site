import DefaultLayout from '@/layouts/DefaultLayout';
import { usePage } from '@inertiajs/react';
import Meta from '@/components/Header/Meta';
import SearchHeader from '@/components/Search/Labels/SearchHeader';
import SearchSubheader from '@/components/Search/Labels/SearchSubheader';
import SearchPagination from '@/components/Search/Tools/SearchPagination';
import Content from '@/components/Content';
import { type BookItemProps } from '@/types';

export default function Search() {
  const { data } = usePage().props as unknown as {
    data: { start: number; rows: number; docs: BookItemProps[]; numFound: number; queryText: string };
  };
  const { start, rows, docs, numFound, queryText } = data;
  const pageTitle = queryText || 'Search Results';

  return (
    <>
      <DefaultLayout>
        <Meta title={pageTitle} />
        <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
          <SearchHeader query={queryText} />
          <div className='items-widget'>
            <div className='top'>
              <SearchSubheader numFound={numFound} start={start} length={docs.length} />
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
              <Content documents={docs} />
            </div>
            <div className='bottom text-center'>
              <SearchPagination rows={rows} />
            </div>
          </div>
        </main>
      </DefaultLayout>
    </>
  );
}
