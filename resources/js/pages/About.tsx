import DefaultLayout from '@/layouts/DefaultLayout';
import Meta from '@/components/Header/Meta';
import MarkdownBody from '@/components/MarkdownBody';
import { usePage } from '@inertiajs/react';

export default function About() {
  const { markdownBodyContent, markdownAsideContent } = usePage().props;

  return (
    <DefaultLayout bodyId='about'>
      <Meta title='About' />
      <div className='container-fluid'>
        <div className='flex-container'>
          <main className='main hasSidebar' role='main' id='mainContent' tabIndex={-1}>
            <h2 className='page-title'>About</h2>
            <div className='maintext'>
              <MarkdownBody content={markdownBodyContent as string} />
            </div>
          </main>
          <aside role='complementary'>
            <h3 className='sidebar-title'>About the ISAW library</h3>
            <div className='content'>
              <MarkdownBody content={markdownAsideContent as string} />
            </div>
          </aside>
        </div>
      </div>
    </DefaultLayout>
  );
}
