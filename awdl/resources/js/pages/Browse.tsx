import DefaultLayout from '@/layouts/DefaultLayout';
import Meta from '@/components/Header/Meta';
import { usePage } from '@inertiajs/react';
import { type BookItemProps } from '@/types';


const Browse: React.FC = () => {

  const pageTitle = 'Browse';
  const { documents } = usePage().props;
  return (
    <DefaultLayout>
      <Meta title={pageTitle} />
      <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
        {/* <StoreInitializer initialData={data} initialPage={page} client:only='react'> */}
          {/* <SearchHeader /> */}
          <div className='items-widget'>
            <div className='top'>
              {/* <SearchSubheader
                initialData={{
                  response: {
                    numFound: data?.response.numFound,
                    start: data?.response.start,
                    docs: data?.response.docs,
                  },
                }}
              /> */}
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
              data-numfound={data?.response.numFound}
              data-start={start}
              data-docslength={data?.response.docs.length}
              data-requesterror='0'
            >
              {/* <Content documents={documents as BookItemProps[]} /> */}
            </div>
            <div className='bottom text-center'>
              {/* <SearchPagination rows={rows} client:only='react' /> */}
            </div>
          </div>
        {/* </StoreInitializer> */}
      </main>
    </DefaultLayout>
  );
};

export default Browse;
