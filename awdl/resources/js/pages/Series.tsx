import { usePage } from '@inertiajs/react';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Link } from '@inertiajs/react';

// Define the structure of a single document
interface SeriesDocument {
  'id': string;
  'label': string;
  'path': string;
}

// Define props for the SeriesContent component
interface SeriesContentProps {
    docs: SeriesDocument[];
}

// Define props for the SeriesItem component
interface SeriesItemProps {
    document: SeriesDocument;
}

// Corrected SeriesItem component
const SeriesItem: React.FC<SeriesItemProps> = ({ document }) => {

  const { label, path } = document;

  const d = path.replace('series/', '')

  console.log(d);

  return (
    <article className="item">
      <div className="card">
        <Link prefetch href={route('series.show', d)}>{label}</Link>
      </div>
    </article>
  );

};

// Corrected SeriesContent component
const SeriesContent: React.FC<SeriesContentProps> = ({ docs }) => {

  if (!docs || docs.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div className="flex-container">
        {docs.map((document: SeriesDocument) => {
          return <SeriesItem key={document.id} document={document} />;
        })}
        <article className="item"></article>
        <article className="item"></article>
      </div>
    </>
  );
};

export default function CollectionsOverview() {

  const { docs } = usePage().props as { docs: SeriesDocument[] };

  const id = 'series';

  const pageTitle = 'Series';

  return (
    <>
      <DefaultLayout id={id} pageTitle={pageTitle}>
        <main className="main container-fluid" role="main" id="mainContent" tabIndex="-1">
          <header>
            <h1 className="page-title">{pageTitle}</h1>
          </header>
          <SeriesContent docs={docs} />
        </main>
      </DefaultLayout>
    </>
  );
}
