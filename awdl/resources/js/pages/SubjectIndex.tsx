import DefaultLayout from '@/layouts/DefaultLayout';
import Meta from '@/components/Header/Meta';
import { usePage } from '@inertiajs/react';

const SubjectIndex: React.FC = () => {
  const pageTitle = 'Subjects: Ancient World Digital Library';
  const { subjectsMap } = usePage().props as unknown as { subjectsMap: { nid: string; label: string }[] };
  return (
    <DefaultLayout>
      <Meta title={pageTitle} />
      <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
        <header>
          <h1 className='page-title'>Subjects</h1>
        </header>
        <div>
          <ul>
            {subjectsMap.map(({ nid, label }) => (
              <li key={nid}>
                <a href={route('subjects.show', nid)}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default SubjectIndex;
