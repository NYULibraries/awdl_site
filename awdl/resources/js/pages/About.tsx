import DefaultLayout from '@/layouts/DefaultLayout';
import Meta from '@/components/Header/Meta';
import ReactMarkdown from 'react-markdown';
import { usePage } from '@inertiajs/react';

export default function About() {
  const { markdownBodyContent, markdownAsideContent } = usePage().props;

  return (
    <DefaultLayout>
      <Meta title='About' />
      <div className='container-fluid'>
        <div className='flex-container'>
          <main className='main hasSidebar' role='main' id='mainContent' tabIndex={-1}>
            <h2 className='page-title'>About</h2>
            <div className='maintext'>
              <ReactMarkdown children={markdownBodyContent as string} />
            </div>
          </main>
          <aside role='complementary'>
            <h3 className='sidebar-title'>About the ISAW library</h3>
            <div className='content'>
              <ReactMarkdown children={markdownAsideContent as string} />
            </div>
          </aside>
        </div>
      </div>
    </DefaultLayout>
  );
}
