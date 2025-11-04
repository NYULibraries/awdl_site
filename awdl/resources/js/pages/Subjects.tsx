import DefaultLayout from '@/layouts/DefaultLayout';
import Meta from '@/components/Header/Meta';
import { usePage } from '@inertiajs/react';
const Subjects: React.FC = () => {
  const pageTitle = 'Subjects: Ancient World Digital Library';
  const { subjectsMap } = usePage().props as unknown as { subjectsMap: Record<string, string> };
  return (
    <DefaultLayout>
      <Meta title={pageTitle} />
      <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
        <header>
          <h1 className='page-title'>Subjects</h1>
        </header>
        <div>
          <ul>
            {Object.entries(subjectsMap).map(([nid, label]) => (
              <li>
                <a href={route('subjects.show', nid)}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Subjects;
