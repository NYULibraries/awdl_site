import DefaultLayout from '@/layouts/DefaultLayout';
import Meta from '@/components/Header/Meta';
import SearchSubheader from '../components/Search/Labels/SearchSubheader';
import SearchPagination from '@/components/Search/Tools/SearchPagination';
import SearchHeader from '@/components/Search/Labels/SearchHeader';
import Content from '@/components/Content';
import { usePage } from '@inertiajs/react';
import { type BookItemProps } from '@/types';

const ProviderPID = () => {
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
      <Meta title={idAlias || 'Provider'} />
      <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
        <SearchHeader query={idAlias} />
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
            <Content documents={docs} />
          </div>
          <div className='bottom text-center'>
            <SearchPagination rows={rows} />
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default ProviderPID;
