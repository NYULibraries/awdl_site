import React from 'react';
import SeriesItem from './SeriesItem';

interface SeriesContentProps {
  data: {
    response: {
      docs: any[];
      numFound: number;
    };
  };
}

const SeriesContent: React.FC<SeriesContentProps> = ({ data }) => {
  if (!data || !data.response || !data.response.docs) {
    return <div>No data available</div>;
  }

  const docs = data.response.docs;

  return (
    <>
      <div className='flex-container'>
        {docs.map((doc: any, index: number) => {
          return <SeriesItem key={index} document={doc} />;
        })}
        <article className='item'></article>
        <article className='item'></article>
      </div>
    </>
  );
};

export default SeriesContent;
