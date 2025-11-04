import DefaultLayout from '@/layouts/DefaultLayout';
import { usePage } from '@inertiajs/react';
import Meta from '@/components/Header/Meta';
import Content from '@/components/Content';
import SearchSubheader from '@/components/Search/Labels/SearchSubheader';
import SearchPagination from '@/components/Search/Tools/SearchPagination';
import SearchHeader from '@/components/Search/Labels/SearchHeader';
import { BookItemProps } from '@/types';

export default function SubjectPID() {
  const { data, idAlias } = usePage().props as unknown as {
    data: {
      docs: BookItemProps[];
      start: number;
      rows: number;
      numFound: number;
    };
    idAlias: string;
  };
  const { docs, start, rows, numFound } = data;
  return (
    <DefaultLayout>
      <Meta title={idAlias || 'Subject'} />
      <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
        <SearchHeader query={idAlias} />
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
