import React from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import ReactMarkdown from 'react-markdown';
import { usePage } from '@inertiajs/react';

export default function About() {

  const { markdownBodyContent, markdownAsideContent } = usePage().props;

  return (
    <DefaultLayout title="About" bodyID="about">
      <div className="container-fluid">
        <div className="flex-container">
          <main className="main hasSidebar" role="main" id="mainContent" tabIndex={-1}>
            <h2 className="page-title">About</h2>
            {/* FIX 1: Apply className="prose" to the wrapper div */}
            <div className="maintext prose">
            <ReactMarkdown
                children={markdownBodyContent}
            />
            </div>
          </main>
          <aside role="complementary">
            <h3 className="sidebar-title">About the ISAW library</h3>
            {/* FIX 2: Apply className="prose" to the wrapper div */}
            <div className="content prose">
            <ReactMarkdown
                children={markdownAsideContent}
            />
            </div>
          </aside>
        </div>
      </div>
    </DefaultLayout>
  );
}
