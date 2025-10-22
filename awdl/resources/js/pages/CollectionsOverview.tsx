import { usePage } from '@inertiajs/react';
import DefaultLayout from '@/layouts/DefaultLayout';
import ISAWLibrary from '@/images/ISAWLibrary420.jpg';
import CollectionItem from '@/components/Collections/CollectionItem';

export default function CollectionsOverview() {

  const { collectionItems } = usePage().props;

  const id = 'collections-overview';

  const pageTitle = 'Collections Overview';

  return (
    <>
      <DefaultLayout id={id} pageTitle={pageTitle}>
        <div className="container-fluid">
		  <div className="flex-container">
		    <main className="main hasSidebar" role="main" id="mainContent" tabIndex="-1">
			  <h2 className="page-title">{pageTitle}</h2>
			    <div className="maintext">
				  <p>
					AWDL's purpose is to present the broadest possible range of scholarly materials relevant to the study of the
					ancient world.
				  </p>
				  <p>Particular strengths of the AWDL collection include:</p>
                  <div className="flex-container">
					{
						collectionItems.map((item, key) => {
						  return <CollectionItem key={key} label={item.label} />;
						})
					}
                    </div>
                  </div>
                </main>
                <aside role="complementary">
                  <h3 className="sidebar-title">AWDL Atlas</h3>
                  <div className="content">
                    <div className="imgHold">
                      <img src={ISAWLibrary} alt="Book Stacks at the Institute for the Study of the Ancient World" />
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </DefaultLayout>
      </>
    );
}
