import React from 'react';
import FilterDropdown from '../Tools/FilterDropdown';
import { usePage } from '@inertiajs/react';
import { type BookItemProps } from '@/types';

const SearchSubheader: React.FC = () => {
  const { data } = usePage().props as unknown as { data: { numFound: number; start: number; docs: BookItemProps[] } };
  const { numFound, start, docs } = data || { numFound: 0, start: 0, docs: [] as BookItemProps[] };
  const displayStart = start < 1 ? 1 : start + 1;
  const displayLength = start + docs.length;

  return numFound < 1 ? (
    <div className='col'>
      <p>Sorry, no results found.</p>
      <p>Try a different term.</p>
    </div>
  ) : (
    <>
      <div className='resultsnum'>
        Showing <span className='start'>{displayStart}</span> - <span className='docslength'>{displayLength}</span> of{' '}
        <span className='numfound'>{numFound}</span> results
      </div>
      <FilterDropdown />
    </>
  );
};

export default SearchSubheader;
