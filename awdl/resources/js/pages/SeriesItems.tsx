import { usePage } from '@inertiajs/react';
import DefaultLayout from '@/layouts/DefaultLayout';
import Content from '@/components/Content';

export default function SeriesItems() {

  const { pageTitle, pageId, documents } = usePage().props;

  console.log('SeriesItems documents:', documents);

  return (
    <DefaultLayout title={pageTitle} id={pageId}>
	  <main className="main container-fluid" role="main" id="mainContent" tabIndex="-1">
	    {/* <SearchHeader seriesLabel={seriesLabel}  /> */}
	    <div className="items-widget">
		  <div className="top">
		    {/* <SearchSubheader/> */}
          </div>
          <div id="items" className="widget items" data-name="items">
            <Content documents={documents} />
          </div>
          <div className="bottom text-center">
            {/* <SearchPagination rows={12} seriesIdentifier={seriesIdentifier} /> */}
          </div>
        </div>
	</main>
  </DefaultLayout>
  );
}
