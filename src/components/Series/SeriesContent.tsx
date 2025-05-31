import React from 'react';
import SeriesItem from './SeriesItem';
import QueryWrapper, { queryClient, useFetchedData } from '../Util/QueryWrapper';
import { QueryClientProvider } from '@tanstack/react-query';
import { seriesSolrUrl } from '../Util/Urls';

const SeriesContent: React.FC = () => {
	const queryResult = useFetchedData();

	if (queryResult.isLoading) {
		return <div>Loading...</div>;
	}
	if (queryResult.isError) {
		return <div>Error: {queryResult.error.message}</div>;
	}
	if (!queryResult.data) {
		return <div>No data available</div>;
	}

	const data = queryResult.data;
	const docs = 'response' in data ? data.response.docs : data.docs;
	const numFound = 'response' in data ? data.response.numFound : data.numFound;

	return (
		<>
			<div className="flex-container">
				{docs.map((doc: any, index: number) => {
					return <SeriesItem key={index} document={doc} />;
				})}
				<article className="item"></article>
				<article className="item"></article>
			</div>
		</>
	);
};

const SeriesContentWrapped: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<QueryWrapper query={seriesSolrUrl}>
				<SeriesContent />
			</QueryWrapper>
		</QueryClientProvider>
	);
};
export default SeriesContentWrapped;
