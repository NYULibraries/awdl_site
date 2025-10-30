import DefaultLayout from '@/layouts/DefaultLayout';
import Meta from '@/components/Header/Meta';

const Providers: React.FC = () => {
  const pageTitle = 'Provider';
  const providerNidToLabelMapping = {
    '1': 'Provider 1',
    '2': 'Provider 2',
    '3': 'Provider 3',
  };

  return (
    <DefaultLayout>
      <Meta title={pageTitle} />
      <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
        <header>
          <h1 className='page-title'>Browse by providers</h1>
        </header>
        <div>
          <ul>
            {Object.entries(providerNidToLabelMapping).map(([nid, label]) => (
              <li>
                <a href={route('providers.show', nid)}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Providers;
