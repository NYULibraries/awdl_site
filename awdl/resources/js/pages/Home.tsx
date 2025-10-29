import DefaultLayout from '@/layouts/DefaultLayout';
import Meta from '@/components/Header/Meta';
import { Link, usePage } from '@inertiajs/react';
import BlogThumb from '/resources/images/blog_thumb.jpg';

export default function Home() {
  const pageTitle = 'Home';

  const { docs } = usePage().props;
  console.log('Home docs:', docs);

  return (
    <>
      <DefaultLayout>
        <Meta title={pageTitle} />
        <main className='main container-fluid' role='main' id='mainContent' tabIndex={-1}>
            <div className='topHold flex-container'>
              <div className='intro itemdouble'>
                <p>
                  <span className='bold'>The Ancient World Digital Library</span> (AWDL) is an initiative of the
                  <a href='http://isaw.nyu.edu' target='_blank' className='ext nobreak'>
                    Institute for the Study of the Ancient World
                  </a>{' '}
                  at
                  <a href='http://www.nyu.edu' target='_blank' className='ext nobreak'>
                    New York University
                  </a>
                  .
                </p>
                <p className='line2'>
                  <span className='nobreak'>AWDL will identify,</span> collect, curate, and provide access to the broadest
                  possible range of scholarly materials relevant to the study of the ancient world.
                  <Link
                    href={route('about')}
                    className='readmore'
                    aria-label='Read more about The Ancient World Digital Library'
                  >
                    READ MORE…
                  </Link>
                </p>
              </div>
              <aside className='item newsitem' role='complementary'>
                <h2 className='sidebar-title'>
                  <a href='http://isaw.nyu.edu/library/blog/collector' target='_blank'>
                    ISAW Library Blog
                  </a>
                </h2>
                <div className='content'>
                  <div className='thumbs'>
                    <div className='clipper'>
                      <a href='http://isaw.nyu.edu/library/blog/collector' target='_blank'>
                        <img src={BlogThumb} alt='the Library of the Institute for the Study of the Ancient World' />
                      </a>
                    </div>
                  </div>
                  <div className='description'>
                    News, information, and features from the Library of the Institute for the Study of the Ancient World
                    at New York University.
                  </div>
                </div>
              </aside>
            </div>
            <div>
              <div data-label='Tabs' className='noFouc tabHolder' style={{ opacity: 1 }}>
                <ul role='tablist' style={{ listStyle: 'none' }}>
                  <li role='presentation'>
                    <h3 style={{ margin: 0 }}>Recently Added Titles</h3>
                  </li>
                </ul>
                <div id='recently-added-titles' role='tabpanel'>
                  {/* <Content client:only='react' /> */}
                </div>
              </div>
            </div>
        </main>
      </DefaultLayout>
    </>
  );
}
