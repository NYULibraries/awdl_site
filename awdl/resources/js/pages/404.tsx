import DefaultLayout from '@/layouts/DefaultLayout';
import Meta from '@/components/Header/Meta';

export default function PageNotFound() {

  const pageTitle = 'Page Not Found';

  return (
    <>
      <DefaultLayout>
        <Meta title='Page Not Found - Ancient World Digital Library' />
        <main>
          <div className='container-fluid'>
            <h1>Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <p>
              <a href={route('home')}>Return to Homepage</a>
            </p>
          </div>
        </main>
      </DefaultLayout>
    </>
  );
}
