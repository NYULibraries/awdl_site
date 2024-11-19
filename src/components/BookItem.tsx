import React, { useState } from 'react';
import BookItemPlaceholder from './BookItemPlaceholder';

interface BookItemProps {
  document: {
    ss_book_identifier: string;
    ss_uri: string;
    ss_title_long: string;
    sm_author: string[];
    sm_series: any;
    sm_publisher: string[];
    sm_field_publication_location: string[];
    ss_publication_date_text: string;
    zm_subject: string[];
    zm_provider: string[];
    bs_status: boolean;
  };
}

const BookItem: React.FC<BookItemProps> = ({ document }) => {
  const {
    ss_book_identifier,
    ss_uri,
    ss_title_long,
    sm_author,
    sm_series,
    sm_publisher,
    sm_field_publication_location,
    ss_publication_date_text,
    zm_subject,
    zm_provider,
    bs_status,
  } = document;

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const imageLoad = (): void => {
    setIsLoaded(true);
  };

  // use ss_identifier instead of field identifier - done
  const identifier = ss_book_identifier;
  // uri = viewer link
  const uri = ss_uri;
  const title = ss_title_long;
  const authors = sm_author || [];
  // Series are all named different
  const series = sm_series;
  // assume can be more than one sm
  const publisher = sm_publisher[0];
  const publicationPlace = sm_field_publication_location[0];
  const publicationDate = ss_publication_date_text;
  const subjects = zm_subject;
  const provider = zm_provider[0];

  console.log(uri)
  return bs_status ? (
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
            <a href={`/ancientworld/${uri}`}>
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
          <a href={`/ancientworld/books/${identifier}/1`}>{title && title}</a>
        </h1>
        {/* Authors */}
        <div className="md_authors">
          <span className="md_label">Author:</span>{' '}
          {authors.length > 0 ? (
            authors.map((author, index) => (
              <span key={index} className="md_author">
                {author}
              </span>
            ))
          ) : (
            <span className="md_author">No author available</span>
          )}
        </div>
        {/* Series - not fixed */}
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
  ) : null;
};

export default BookItem;
