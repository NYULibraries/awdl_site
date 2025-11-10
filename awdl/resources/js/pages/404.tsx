import DefaultLayout from '@/layouts/DefaultLayout';
import Meta from '@/components/Header/Meta';
import { Link } from '@inertiajs/react';

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
              <Link href={route('home')}>Return to Homepage</Link>
            </p>
          </div>
        </main>
      </DefaultLayout>
    </>
  );
}
