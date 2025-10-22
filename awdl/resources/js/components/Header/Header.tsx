import React from 'react';
import Navigation from './Navigation/Navigation.tsx';

const baseURL: string = '';

export default function Header() {
  return (
    <>
      <div className='header-wrapper'>
        <header className='header-main container-fluid' role='banner'>
          <div className='toplogo'>
            <a href='http://isaw.nyu.edu/' className='isawlogo' target='_blank' rel='noreferrer'>
              NYU | ISAW
            </a>
          </div>
          <h1 className='sitename'>
            <a href={`${baseURL}`}>Ancient World Digital Library</a>
          </h1>
        </header>
      </div>
      <Navigation />
    </>
  );
}
