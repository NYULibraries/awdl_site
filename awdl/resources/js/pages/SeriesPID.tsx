import { usePage } from '@inertiajs/react';
import DefaultLayout from '@/layouts/DefaultLayout';
import Content from '@/components/Content';
import Meta from '@/components/Header/Meta';
import { type BookItemProps } from '@/types';

export default function SeriesPID() {
  const { pageTitle, documents } = usePage().props;

  console.log('SeriesItems documents:', documents);

  return (
    <DefaultLayout>
      <Meta title={pageTitle as string} />
      <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
        {/* <SearchHeader seriesLabel={seriesLabel}  /> */}
        <div className='items-widget'>
          <div className='top'>{/* <SearchSubheader/> */}</div>
          <div id='items' className='widget items' data-name='items'>
            <Content documents={documents as BookItemProps[]} />
          </div>
          <div className='bottom text-center'>
            {/* <SearchPagination rows={12} seriesIdentifier={seriesIdentifier} /> */}
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
