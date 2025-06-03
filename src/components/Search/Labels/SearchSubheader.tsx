import React from 'react';
import FilterDropdown from '../Tools/FilterDropdown';
import { useStore } from '@nanostores/react';
import { contentStore } from '../../../stores/contentStore';
import { type DocumentSchema } from '../../Util/fetchCSR';
import { z } from 'zod';

interface SearchSubheaderProps {
	initialData: {
		response: {
			numFound: number;
			start: number;
			docs: z.infer<typeof DocumentSchema>[];
		};
	};
}

const SearchSubheader: React.FC<SearchSubheaderProps> = ({ initialData }) => {
	const data = useStore(contentStore) || initialData;

	if (!data?.response) return null;

	const { numFound, start } = data.response;
	const documentsLength = data.response.docs.length;
	const displayStart = start < 1 ? 1 : start + 1;
	const displayLength = start + documentsLength;

	return numFound < 1 ? (
		<div className="col">
			<p>Sorry, no results found.</p>
			<p>Try a different term.</p>
		</div>
	) : (
		<>
			<div className="resultsnum">
				Showing items <span className="start">{displayStart}</span> -{' '}
				<span className="docslength">{displayLength}</span> of <span className="numfound">{numFound}</span>
			</div>
			<FilterDropdown />
		</>
	);
};

export default SearchSubheader;
