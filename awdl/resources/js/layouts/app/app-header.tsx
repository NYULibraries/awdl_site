import { Fragment} from 'react';
import Navigation from '@/components/Header/Navigation/Navigation';

export default function AppHeader() {
  return (
    <Fragment>
      <div className='header-wrapper'>
        <header className='header-main container-fluid' role='banner'>
          <div className='toplogo'>
            <a href='http://isaw.nyu.edu/' className='isawlogo' target='_blank' rel='noreferrer'>
              NYU | ISAW
            </a>
          </div>
          <h1 className='sitename'>
            <a href={route('home')}>Ancient World Digital Library</a>
          </h1>
        </header>
      </div>
      <Navigation />
    </Fragment>
  );
}
