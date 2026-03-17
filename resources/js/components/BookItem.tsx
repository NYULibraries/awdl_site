import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import BookItemPlaceholder from './BookItemPlaceholder';
import { type BookItemProps, type SeriesData } from '@/types';

const BookItem: React.FC<{ document: BookItemProps }> = ({ document }) => {
  const { seriesMap } = usePage().props as unknown as { seriesMap: Record<string, string> };
  const {
    identifier,
    title,
    authors,
    publisher,
    publicationPlace,
    publicationDate,
    providerIds,
    subjectIds,
    providerLabels,
    subjectLabels,
    seriesData,
    bs_status,
  } = document;

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const imageLoad = (): void => {
    setIsLoaded(true);
  };

  const baseURL = '';
  const series = seriesData?.[0];

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
                  {' ' + series.series_label}
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
          {subjectLabels.map((subject: string, index: number) => (
            <a key={index} className='md_subject' href={`${baseURL}/subjects/${subjectIds[index]}`}>
              {' ' + subject}
            </a>
          ))}
        </div>
        {/* Partners */}
        <div className='md_partner'>
          <span className='md_label'>Provider:</span>
          {providerLabels.map((provider: string, index: number) => (
            <a key={index} className='md_provider' href={`${baseURL}/providers/${providerIds[index]}`}>
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
