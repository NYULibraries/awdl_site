import React, { useState, useEffect } from 'react';
import SeriesItem from './SeriesItem';

interface ApiResponse {
  response: {
    numFound: number;
    docs: any[];
  };
}

const SeriesContent: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const url = "https://discovery1.dlib.nyu.edu/solr/viewer/select?fl=*&fq=bundle:dlts_series&fq=sm_series_code:(awdl%20OR%20egypt)l&sort=ss_series_label%20asc&rows=1000&wt=json"


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
    'ss_series_label',
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

      <div className="flex-container">
        {data?.response.docs.map((doc, index) => (
          <SeriesItem key={index} document={doc} />
        ))}
        <article className="item"></article>
        <article className="item"></article>
      </div>
    </>
  );
};

export default SeriesContent;
