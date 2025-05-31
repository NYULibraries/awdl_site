import React from 'react';
import BookItem from './BookItem';
import QueryWrapper, { queryClient, useFetchedData } from './Util/QueryWrapper';
import { QueryClientProvider } from '@tanstack/react-query';
import { condensedUrl } from './Util/Urls';

const Content: React.FC = () => {
	const queryResult = useFetchedData();

	/* eslint-disable curly */
	if (queryResult.isLoading) return <div>Loading...</div>;
	if (queryResult.isError) return <div>Error: {queryResult.error.message}</div>;
	if (!queryResult.data) return <div>No data available</div>;
	/* eslint-enable curly */

	const data = queryResult.data;
	const docs = 'response' in data ? data.response.docs : data.docs;
	const numFound = 'response' in data ? data.response.numFound : data.numFound;

	return (
		<>
			<p>Number of documents found: {numFound}</p>

			<div className="item-list flex-container">
				{docs.map((doc: any, index: number) => {
					return <BookItem key={index} document={doc} />;
				})}
				<article className="item"></article>
				<article className="item"></article>
			</div>
		</>
	);
};

const ContentWrapped: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<QueryWrapper query={condensedUrl}>
				<Content />
			</QueryWrapper>
		</QueryClientProvider>
	);
};
export default ContentWrapped;
