import React, { useState, useEffect } from 'react';
import SeriesItem from './SeriesItem';
import QueryWrapper, {
  queryClient,
  useFetchedData,
} from '../Util/QueryWrapper';
import { QueryClientProvider } from '@tanstack/react-query';
import { seriesUrl } from '../Util/Urls';

const SeriesContent: React.FC = () => {
  const queryResult = useFetchedData();

  if (queryResult.isLoading) return <div>Loading...</div>;
  if (queryResult.isError) return <div>Error: {queryResult.error.message}</div>;

  console.log(queryResult.data?.response.docs);
  const docs = queryResult.data?.response.docs;
  const numFound = queryResult.data?.response.numFound;

  return (
    <>
      <div className="flex-container">
        {docs &&
          docs.map((doc, index) => <SeriesItem key={index} document={doc} />)}
        <article className="item"></article>
        <article className="item"></article>
      </div>
    </>
  );
};

const SeriesContentWrapped: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryWrapper query={seriesUrl}>
        <SeriesContent />
      </QueryWrapper>
    </QueryClientProvider>
  );
};
export default SeriesContentWrapped;
