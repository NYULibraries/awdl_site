import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';

interface ApiResponse {
  response: {
    numFound: number;
    docs: any[];
  };
}

const Content: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fields = [
    'sm_field_identifier',
    'ss_title_long',
    'sm_author',
    'sm_series',
    'sm_publisher',
    'sm_field_publication_location',
    'ss_publication_date_text',
    'zm_subject',
    'zm_provider',
  ];

  const createFieldString = (fieldsArray: string[]): string => {
    return fieldsArray.join(',');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fieldString = createFieldString(fields);
        const response = await fetch(
          `https://discovery1.dlib.nyu.edu/solr/viewer/select?wt=json&q=*:*&fl=${fieldString}&fq=sm_collection_code:awdl&rows=12&start=1&sort=ss_longlabel%20asc`,
        );
        if (!response.ok) {
        }
        const result: ApiResponse = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        setError('An error occurred while fetching data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <p>Number of documents found: {data?.response.numFound}</p>

      <div className="item-list flex-container">
        {data?.response.docs.map((doc, index) => (
          <BookItem key={index} document={doc} />
        ))}
        <article className="item"></article>
        <article className="item"></article>
      </div>
    </>
  );
};

export default Content;
