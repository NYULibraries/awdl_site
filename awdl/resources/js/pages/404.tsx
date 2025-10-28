import DefaultLayout from '@/layouts/DefaultLayout';

const baseURL = '';

export default function CollectionsOverview() {

  const { collectionItems } = usePage().props;

  const id = 'collections-overview';

  const pageTitle = 'Collections Overview';

  return (
    <>
      <DefaultLayout title="Page Not Found - Ancient World Digital Library">
	    <main>
		  <div class="container-fluid">
			<h1>Page Not Found</h1>
			<p>The page you're looking for doesn't exist.</p>
			<p><a href={baseURL}>Return to Homepage</a></p>
		  </div>
	    </main>
	  </DefaultLayout>
    </>
  )
}
