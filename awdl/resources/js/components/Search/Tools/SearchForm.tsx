import React, { useRef } from 'react';
import { usePage } from '@inertiajs/react';

export default function SearchForm() {
  const { data, idAlias } = usePage().props as unknown as {
    data?: { queryText?: string};
    idAlias?: string;
  };
  console.log(data);
  const { queryText } = data || { queryText: '*:*' as string };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchQuery = inputRef.current?.value?.trim() || '';
    if (inputRef.current) {
      inputRef.current.blur();
    }

    // only include 'q' if it's not empty and not the default
    const params = new URLSearchParams();
    if (searchQuery && searchQuery !== '*:*') {
      params.set('q', searchQuery);
    }
    params.set('page', '1');

    const searchUrl = `/search/?${params.toString()}`;
    window.location.href = searchUrl;
  };

  let defaultSearchValue;
  const pathname = window.location.pathname;
  switch (true) {
    case pathname.includes('/providers/') && pathname !== '/providers':
      defaultSearchValue = '';
      break;
    case pathname.includes('/subjects/') && pathname !== '/subjects':
      defaultSearchValue = '';
      break;
    case pathname.includes('/series/') && pathname !== '/series':
      defaultSearchValue = '';
      break;
    default:
      defaultSearchValue = queryText === '*:*' ? '' : queryText;
      break;
  }

  return (
    <form onSubmit={handleSubmit} role='search' className='dl-search'>
      <input
        id='q'
        name='q'
        type='text'
        className='searchfield'
        defaultValue={defaultSearchValue}
        placeholder='Search titles, subjects, authors...'
        title='Enter the terms you wish to search for.'
        aria-label='Search'
        ref={inputRef}
      />
      <button type='submit' aria-label='submit' value='submit' className='submit-search'>
        <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
        </svg>
      </button>
    </form>
  );
}
