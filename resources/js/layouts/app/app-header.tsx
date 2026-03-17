import { Fragment } from 'react';
import Navigation from '@/components/Header/Navigation/Navigation';
import { Link } from '@inertiajs/react';

export default function AppHeader() {
  return (
    <Fragment>
      <div id='skipnav'>
        <a href='#mainContent'>Skip navigation</a>
      </div>
      <div className='header-wrapper'>
        <header className='header-main container-fluid' role='banner'>
          <div className='toplogo'>
            <a href='http://isaw.nyu.edu/' className='isawlogo' target='_blank' rel='noreferrer'>
              NYU | ISAW
            </a>
          </div>
          <h1 className='sitename'>
            <Link href={route('home')}>Ancient World Digital Library</Link>
          </h1>
        </header>
      </div>
      <Navigation />
    </Fragment>
  );
}
