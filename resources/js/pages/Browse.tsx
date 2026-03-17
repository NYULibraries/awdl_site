import DefaultLayout from '@/layouts/DefaultLayout';
import Meta from '@/components/Header/Meta';
import { usePage } from '@inertiajs/react';
import { type BookItemProps } from '@/types';
import SearchHeader from '@/components/Search/Labels/SearchHeader';
import SearchSubheader from '@/components/Search/Labels/SearchSubheader';
import Content from '@/components/Content';
import SearchPagination from '@/components/Search/Tools/SearchPagination';

const Browse: React.FC = () => {
  const pageTitle = 'Browse';
  const { data } = usePage().props as unknown as {
    data: {
      start: number;
      rows: number;
      docs: BookItemProps[];
      numFound: number;
      queryText: string;
    };
  };
  const { start, rows, docs, numFound, queryText } = data;
  return (
    <DefaultLayout bodyId='browse'>
      <Meta title={pageTitle} />
      <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
        <SearchHeader query={queryText} />
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
};

export default Browse;
