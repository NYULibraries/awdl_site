import React from 'react';
import { useStore } from '@nanostores/react';
import { searchFieldStore } from '../../../stores/contentStore';

function SearchHeader() {
	const query = useStore(searchFieldStore);

	if (query === '*:*') {
		return <h1 className="page-title">Browse titles</h1>;
	}

	return (
		<h1 className="page-title">
			Search Results for: <span className="s-query">{query}</span>
		</h1>
	);
}

export default SearchHeader;
