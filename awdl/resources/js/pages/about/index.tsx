import React from 'react';
import DefaultLayout from '../../layouts/DefaultLayout.tsx';
import { Content as AboutContent } from '../../components/About/about.md';
import { Content as SidebarContent } from '../../components/About/aboutSidebar.md';
import ReactMarkdown from 'react-markdown';

const AboutPage = () => {
  return (
    <DefaultLayout title='About' bodyID='about'>
      <div className='container-fluid'>
        <div className='flex-container'>
          <main className='main hasSidebar' role='main' id='mainContent' tabIndex={-1}>
            <h2 className='page-title'>About</h2>
            <div className='maintext'>
              <ReactMarkdown>{AboutContent}</ReactMarkdown>
            </div>
          </main>
          <aside role='complementary'>
            <h3 className='sidebar-title'>About the ISAW library</h3>
            <div className='content'>
              <ReactMarkdown>{SidebarContent}</ReactMarkdown>
            </div>
          </aside>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AboutPage;
