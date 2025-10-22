import React from 'react';
import BookItem from './BookItem';

const Content: React.FC = ( { documents }) => {

  return (
    <>
      <div className="item-list flex-container">
      {
        documents.map((document: any, index: number) => {
          return <BookItem key={index} document={document} />;
        })
      }
      <article className="item"></article>
      <article className="item"></article>
    </div>
  </>
  );
};

export default Content;
