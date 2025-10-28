import React from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import ReactMarkdown from 'react-markdown';
import { usePage } from '@inertiajs/react';

export default function About() {

  const { id, title, markdownBodyContent } = usePage().props;

  return (
    <DefaultLayout title={title} id={id} bodyclassName="page">
	    <div className="container-fluid">
		    <div className="flex-container">
			    <main className="main" role="main" id="mainContent" tabIndex="-1">
				    <h2 className="page-title">Partners</h2>
    				<div className="maintext">
              <div className="maintext prose">
                <ReactMarkdown children={markdownBodyContent} />
              </div>
		    		</div>
			   </main>
  		  </div>
	    </div>
    </DefaultLayout>
  );
}
