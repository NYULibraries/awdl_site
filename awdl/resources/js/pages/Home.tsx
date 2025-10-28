import { Head } from '@inertiajs/react';
import DefaultLayout from '@/layouts/DefaultLayout';

export default function Welcome() {

  const pageTitle = 'Welcome to the Ancient World Digital Library';

  const id = 'home';

  return (
    <>
      <DefaultLayout id={id} pageTitle={pageTitle}>
        <Head title="Welcome"></Head>
        <div>HOLA</div>
      </DefaultLayout>
    </>
  );
}
