import DefaultLayout from '@/layouts/DefaultLayout';
import ReactMarkdown from 'react-markdown';
import { usePage } from '@inertiajs/react';
import Meta from '@/components/Header/Meta';

export default function Partners() {
  const { id, title, markdownBodyContent } = usePage().props;

  return (
    <DefaultLayout>
      <Meta title={title as string} />
      <div className='container-fluid'>
        <div className='flex-container'>
          <main className='main' role='main' id='mainContent' tabIndex={-1}>
            <h2 className='page-title'>Partners</h2>
            <div className='maintext'>
              <ReactMarkdown children={markdownBodyContent as string} />
            </div>
          </main>
        </div>
      </div>
    </DefaultLayout>
  );
}
