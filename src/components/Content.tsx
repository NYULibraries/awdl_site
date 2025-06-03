import React from 'react';
import BookItem from './BookItem';
import { useStore } from '@nanostores/react';
import { contentStore } from '../stores/contentStore';

const Content: React.FC = () => {
	const data = useStore(contentStore);
	// Check if data is in store and right format
	if (!data?.response) return null;

	const docs = data.response.docs;

	return (
		<>
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

export default Content;
