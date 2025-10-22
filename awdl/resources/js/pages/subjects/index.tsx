import React from 'react';
import DefaultLayout from '../../layouts/DefaultLayout.tsx';
import { subjectNidToLabelMapping } from '../../../Util/pagemaps/subjectMapping.ts';

const baseURL = '';

export default function SubjectsPage() {
  return (
    <DefaultLayout title='Subjects: Ancient World Digital Library'>
      <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
        <header>
          <h1 className='page-title'>Subjects</h1>
        </header>
        <div>
          <ul>
            {Object.entries(subjectNidToLabelMapping).map(([nid, label]) => {
              return (
                <li>
                  <a href={`${baseURL}/subjects/${nid}`}>{label}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </DefaultLayout>
  );
}
