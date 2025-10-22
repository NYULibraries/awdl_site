import DefaultLayout from '@/layouts/DefaultLayout';
import { usePage } from '@inertiajs/react';
import Content from '@/components/Content.tsx';
// import SearchSubheader from '@/components/Search/Labels/SearchSubheader.tsx';
// import SearchPagination from '@/components/Search/Tools/SearchPagination.tsx';

export default function Search() {

  const { id, documents, start, pageTitle, rows, query } = usePage().props;

  console.log(documents);

  return (
    <>
      <DefaultLayout title="Search Results" bodyID="search">
        <main className="main container-fluid" role="main" id="mainContent" tabIndex="-1">
          <h1 className="page-title">{pageTitle}</h1>
	      <div className="items-widget">
	        <div className="top">
              {/* <SearchSubheader /> */}
            </div>
            <div
              id="items"
              className="widget items"
              data-name="items"
              data-rows={rows}
              data-source="https://discovery1.dlib.nyu.edu/solr/viewer/select"
              data-fl="*"
              data-fq-bundle="dlts_book"
              data-fq-sm_collection_code="awdl"
            //   data-numfound={data?.response.numFound}
              data-start={start}
              data-docslength={documents.length}
              data-requesterror="0"
            >
              <Content documents={documents} />
            </div>
		    <div className="bottom text-center">
		      {/* <SearchPagination rows={rows} client:only="react" /> */}
		    </div>
		  </div>
        </main>
      </DefaultLayout>
    </>
  );
}

