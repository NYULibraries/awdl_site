import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import BookItemPlaceholder from './BookItemPlaceholder';
import { type BookItemProps, type SeriesData } from '@/types';

const BookItem: React.FC<{ document: BookItemProps }> = ({ document }) => {
  const { seriesMap } = usePage().props as unknown as { seriesMap: Record<string, string> };
  /* eslint-disable camelcase */
  const {
    ss_book_identifier,
    ss_title_long,
    sm_author,
    sm_publisher,
    sm_field_publication_location,
    ss_publication_date_text,
    bs_status,
    sm_provider_nid,
    im_field_subject,
    sm_provider_label,
    sm_subject_label,
    zm_series_data_x,
  } = document;
  /* eslint-enable camelcase */

  const baseURL = '';

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const imageLoad = (): void => {
    setIsLoaded(true);
  };

  /**
   * Decodes HTML entities that api-returns as encoded: &, <, >, ", ', non-breaking spaces, copyright symbol, registered trademark symbol, euro symbol, etc.
   * @param text - text to decode
   * @returns decoded text
   */

  const decodeHtmlEntities = (text: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    return doc.documentElement.textContent || text;
  };

  /* eslint-disable camelcase */
  const identifier = ss_book_identifier;
  const title = ss_title_long || 'N.A.';
  const authors = sm_author || [];
  // Series are all named different - still needs to be done
  const series = zm_series_data_x?.[0];
  // Assume can be more than one publisher, provider, and subject
  // Some publishers have encoded & symbols
  const publisher = decodeHtmlEntities(sm_publisher?.[0] || 'N.A.');
  const publicationPlace = sm_field_publication_location?.[0] || 'N.A.';
  // Some publication dates have c symbols but they are not encoded they are just c's
  const publicationDate = ss_publication_date_text || 'N.A.';
  const providerCodes = sm_provider_nid || [];
  const providers = sm_provider_label || [];
  const subjectCodes = im_field_subject || [];
  const subjects = sm_subject_label || [];

  return bs_status ? (
    <article className='item'>
      <div className='card'>
        {/* Thumbnail */}
        <div className='thumbs'>
          {!isLoaded && <BookItemPlaceholder />}
          <div className={isLoaded ? 'clipper' : 'clipperNoshadow imagePlaceholder'}>
            <Link href={`${baseURL}/books/${identifier}/1`}>
              <img
                src={`https://sites.dlib.nyu.edu/viewer/api/image/books/${identifier}/1/full/150,200/0/default.jpg`}
                alt=''
                title={title}
                onLoad={imageLoad}
              />
            </Link>
          </div>
        </div>
        {/* Title */}
        <h1 className='md_title'>
          <Link href={`${baseURL}/books/${identifier}/1`}>{title && title}</Link>
        </h1>
        {/* Authors */}
        <div className='md_authors'>
          <span className='md_label'>Author:</span>{' '}
          {authors.length > 0 ? (
            authors.map((author: string, index: number) => {
              return (
                <span key={index} className='md_author'>
                  {author}
                </span>
              );
            })
          ) : (
            <span className='md_author'>No author available</span>
          )}
        </div>
        {series && series.length > 0 ? (
          <div className='md_series'>
            <span className='md_label'>Series:</span>
            {series.map((series: SeriesData, index: number) => {
              const pathAlias = seriesMap?.[series.series_identifier] || series.series_identifier;
              return (
                <a key={index} className='md_series_each' href={`${baseURL}/series/${pathAlias}`}>
                  {' ' + series.series_book_label}
                </a>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        {/* Publisher */}
        <div>
          <span className='md_label'>Publisher:</span> <span>{publisher}</span>
        </div>
        {/* Place of Publication */}
        <div>
          <span className='md_label'>Place of Publication:</span> {publicationPlace}
        </div>
        {/* Date of Publication */}
        <div>
          <span className='md_label'>Date of Publication:</span> {publicationDate}
        </div>
        {/* Subjects */}
        <div className='md_subjects'>
          <span className='md_label'>Subject:</span>
          {subjects.map((subject: string, index: number) => (
            <a key={index} className='md_subject' href={`${baseURL}/subjects/${subjectCodes[index]}`}>
              {' ' + subject}
            </a>
          ))}
        </div>
        {/* Partners */}
        <div className='md_partner'>
          <span className='md_label'>Provider:</span>
          {providers.map((provider: string, index: number) => (
            <a key={index} className='md_provider' href={`${baseURL}/providers/${providerCodes[index]}`}>
              {' ' + provider}
            </a>
          ))}
        </div>
      </div>
    </article>
  ) : (
    <></>
  );
};

export default BookItem;
