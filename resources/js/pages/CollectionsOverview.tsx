import { usePage } from '@inertiajs/react';
import DefaultLayout from '@/layouts/DefaultLayout';
import ISAWLibrary from '/resources/images/ISAWLibrary420.jpg';
import CollectionItem from '@/components/Collections/CollectionItem';
import Meta from '@/components/Header/Meta';

export default function CollectionsOverview() {
  const { collectionItems } = usePage().props as unknown as { collectionItems: { label: string }[] };

  const pageTitle = 'Collections Overview';

  return (
    <>
      <DefaultLayout bodyId='collections-overview'>
        <Meta title={pageTitle} />
        <div className='container-fluid'>
          <div className='flex-container'>
            <main className='main hasSidebar' role='main' id='mainContent' tabIndex={-1}>
              <h2 className='page-title'>{pageTitle}</h2>
              <div className='maintext'>
                <p>
                  AWDL's purpose is to present the broadest possible range of scholarly materials relevant to the study
                  of the ancient world.
                </p>
                <p>Particular strengths of the AWDL collection include:</p>
                <div className='flex-container'>
                  {collectionItems.map((item: { label: string }, index: number) => {
                    return <CollectionItem key={index} label={item.label} />;
                  })}
                </div>
              </div>
            </main>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
