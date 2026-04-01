import DefaultLayout from '@/layouts/DefaultLayout';
import MarkdownBody from '@/components/MarkdownBody';
import { usePage } from '@inertiajs/react';
import Meta from '@/components/Header/Meta';

export default function Takedown() {
  const { markdownBodyContent } = usePage().props;

  return (
    <DefaultLayout bodyId='takedown' bodyClass='page'>
      <Meta title='Takedown Policy' />
      <div className='container-fluid'>
        <div className='flex-container'>
          <main className='main' role='main' id='mainContent' tabIndex={-1}>
            <h2 className='page-title'>Takedown Policy</h2>
            <div className='maintext'>
              <MarkdownBody content={markdownBodyContent as string} />
            </div>
          </main>
        </div>
      </div>
    </DefaultLayout>
  );
}
