import DefaultLayout from '@/layouts/DefaultLayout';
import MarkdownBody from '@/components/MarkdownBody';
import { usePage } from '@inertiajs/react';
import Meta from '@/components/Header/Meta';

export default function Partners() {
  const { title, markdownBodyContent } = usePage().props;

  return (
    <DefaultLayout bodyId='partners' bodyClass='page'>
      <Meta title={title as string} />
      <div className='container-fluid'>
        <div className='flex-container'>
          <main className='main' role='main' id='mainContent' tabIndex={-1}>
            <h2 className='page-title'>Partners</h2>
            <div className='maintext'>
              <MarkdownBody content={markdownBodyContent as string} />
            </div>
          </main>
        </div>
      </div>
    </DefaultLayout>
  );
}
