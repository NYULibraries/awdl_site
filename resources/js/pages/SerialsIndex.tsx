import { usePage, Link } from '@inertiajs/react';
import DefaultLayout from '@/layouts/DefaultLayout';
import Meta from '@/components/Header/Meta';

interface SerialDocument {
  id: string;
  label: string;
  path: string;
  count: number;
}

interface SerialsContentProps {
  docs: SerialDocument[];
}

interface SerialItemProps {
  document: SerialDocument;
}

const SerialItem: React.FC<SerialItemProps> = ({ document }) => {
  const { id, label } = document;

  return (
    <article className='item'>
      <div className='card'>
        <Link href={route('serials.show', id)}>{label}</Link>
      </div>
    </article>
  );
};

const SerialsContent: React.FC<SerialsContentProps> = ({ docs }) => {
  if (!docs || docs.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div className='flex-container'>
        {docs.map((document: SerialDocument) => {
          return <SerialItem key={document.id} document={document} />;
        })}
        <article className='item'></article>
        <article className='item'></article>
      </div>
    </>
  );
};

export default function SerialsIndex() {
  const { docs } = usePage().props as unknown as { docs: SerialDocument[] };

  const pageTitle = 'Serials';

  return (
    <>
      <DefaultLayout bodyId='serials'>
        <Meta title={pageTitle} />
        <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
          <header>
            <h1 className='page-title'>{pageTitle}</h1>
          </header>
          <SerialsContent docs={docs} />
        </main>
      </DefaultLayout>
    </>
  );
}
