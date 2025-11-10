import { usePage } from '@inertiajs/react';
import DefaultLayout from '@/layouts/DefaultLayout';
import Meta from '@/components/Header/Meta';

interface SeriesDocument {
  id: string;
  label: string;
  path: string;
}

interface SeriesContentProps {
  docs: SeriesDocument[];
}

interface SeriesItemProps {
  document: SeriesDocument;
}

const SeriesItem: React.FC<SeriesItemProps> = ({ document }) => {
  const { label, path } = document;

  const pathAlias = path.replace('series/', '').split('?')[0];

  return (
    <article className='item'>
      <div className='card'>
        <a href={route('series.show', pathAlias)}>{label}</a>
      </div>
    </article>
  );
};

const SeriesContent: React.FC<SeriesContentProps> = ({ docs }) => {
  if (!docs || docs.length === 0) {
    return <div>No data available</div>;
  }
  console.log('SeriesContent docs:', docs);

  return (
    <>
      <div className='flex-container'>
        {docs.map((document: SeriesDocument) => {
          return <SeriesItem key={document.id} document={document} />;
        })}
        <article className='item'></article>
        <article className='item'></article>
      </div>
    </>
  );
};

export default function SeriesIndex() {
  const { docs } = usePage().props as unknown as { docs: SeriesDocument[] };

  const pageTitle = 'Series';

  return (
    <>
      <DefaultLayout bodyId='series'>
        <Meta title={pageTitle} />
        <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
          <header>
            <h1 className='page-title'>{pageTitle}</h1>
          </header>
          <SeriesContent docs={docs} />
        </main>
      </DefaultLayout>
    </>
  );
}
