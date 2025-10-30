import DefaultLayout from '@/layouts/DefaultLayout';
// import { subjectNidToLabelMapping } from '../../Util/pagemaps/subjectMapping.ts';
import Meta from '@/components/Header/Meta';

const Subjects: React.FC = () => {
  const pageTitle = 'Subjects: Ancient World Digital Library';
  const subjectNidToLabelMapping = {
    '1': 'Subject 1',
    '2': 'Subject 2',
    '3': 'Subject 3',
  };
  return (
    <DefaultLayout>
      <Meta title={pageTitle} />
      <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
        <header>
          <h1 className='page-title'>Subjects</h1>
        </header>
        <div>
          <ul>
            {Object.entries(subjectNidToLabelMapping).map(([nid, label]) => (
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
