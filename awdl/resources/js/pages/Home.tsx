import { Head } from '@inertiajs/react';
import DefaultLayout from '@/layouts/DefaultLayout';

export default function Welcome() {

  const pageTitle = 'Welcome to the Ancient World Digital Library';

  return (
    <>
      <DefaultLayout>
        <Head title={pageTitle}></Head>
        <div>HOLA</div>
      </DefaultLayout>
    </>
  );
}
