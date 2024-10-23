import React, { useState } from 'react';
import BookItemPlaceholder from './BookItemPlaceholder';

interface BookItemProps {
  document: {
    sm_field_identifier: string[];
    ss_title_long: string;
    sm_author: string[];
    sm_series: any;
    sm_publisher: string[];
    sm_field_publication_location: string[];
    ss_publication_date_text: string;
    zm_subject: string[];
    zm_provider: string[];
  };
}

const BookItem: React.FC<BookItemProps> = ({ document }) => {
  const {
    sm_field_identifier,
    ss_title_long,
    sm_author,
    sm_series,
    sm_publisher,
    sm_field_publication_location,
    ss_publication_date_text,
    zm_subject,
    zm_provider,
  } = document;

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const imageLoad = (): void => {
    setIsLoaded(true);
  };

  // use ss_identifier instead of field identifier
  const identifier = sm_field_identifier[0];
  const title = ss_title_long;
  const authors = sm_author;
  // Series are all named different
  const series = sm_series;
  // assume can be more than one sm
  const publisher = sm_publisher[0];
  const publicationPlace = sm_field_publication_location[0];
  const publicationDate = ss_publication_date_text;
  const subjects = zm_subject;
  const provider = zm_provider[0];

  return (
    <article className="item">
      <div className="card">
        {/* Thumbnail */}
        <div className="thumbs">
          {!isLoaded && <BookItemPlaceholder />}
          <div
            className={
              isLoaded ? 'clipper' : 'clipperNoshadow imagePlaceholder'
            }
          >
            <a href={`/books/${identifier}/1`}>
              <img
                src={`https://sites.dlib.nyu.edu/viewer/api/image/books/${identifier}/1/full/150,/0/default.jpg`}
                alt=""
                title={title}
                onLoad={imageLoad}
              />
            </a>
          </div>
        </div>
        {/* Title */}
        <h1 className="md_title">
          <a href={`/books/${identifier}/1`}>{title && title}</a>
        </h1>
        {/* Authors */}
        <div className="md_authors">
          <span className="md_label">Author:</span>{' '}
          {authors.map((author, index) => {
            return (
              <span key={index} className="md_author">
                {author}
              </span>
            );
          })}
        </div>
        {/* Series */}
        <div className="md_series">
          <span className="md_label">Series:</span>
          <a
            className="md_series_each"
            href="/series/bulletin-of-the-american-society-of-papyrologists"
          >
            Bulletin of the American Society of Papyrologists v. 3
          </a>
        </div>
        {/* Publisher */}
        <div>
          <span className="md_label">Publisher:</span> <span>{publisher}</span>
        </div>
        {/* Place of Publication */}
        <div>
          <span className="md_label">Place of Publication:</span>{' '}
          {publicationPlace}
        </div>
        {/* Date of Publication */}
        <div>
          <span className="md_label">Date of Publication:</span>{' '}
          {publicationDate}
        </div>
        {/* Subjects */}
        <div className="md_subjects">
          <span className="md_label">Subject:</span>
          {subjects.map((subject, index) => {
            try {
              const subjectObj = JSON.parse(subject);
              return (
                <a
                  key={index}
                  className="md_subject"
                  href={`/subjects/${subjectObj.tid}`}
                >
                  {subjectObj.name}
                </a>
              );
            } catch (error) {
              console.error('Error parsing subject:', subject, error);
              return null; // or return a fallback UI
            }
          })}
        </div>
        {/* Partners */}
        <div className="md_partner">
          <span className="md_label">Provider:</span>
          {(() => {
            try {
              const providerObj = JSON.parse(provider);
              return (
                <a
                  className="md_provider"
                  href={`/providers/${providerObj.nid}`}
                >
                  {providerObj.name}
                </a>
              );
            } catch (error) {
              console.error('Error parsing provider:', provider, error);
              return null; // or return a fallback UI
            }
          })()}
        </div>
      </div>
    </article>
  );
};

export default BookItem;
