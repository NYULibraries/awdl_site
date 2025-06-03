import React, { useRef } from 'react';
import { useStore } from '@nanostores/react';
import { contentStore, searchFieldStore, pageStore } from '../../../stores/contentStore';
import { fetchSolrData } from '../../../Util/fetch';

function SearchForm() {
	const inputRef = useRef<HTMLInputElement>(null);
	const searchField = useStore(searchFieldStore);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const searchQuery = inputRef.current?.value || '*:*';
		if (inputRef.current) {
			inputRef.current.blur();
		}

		searchFieldStore.set(searchQuery);
		// Reset page to 1 for pagination
		pageStore.set(1);

		const newData = await fetchSolrData({
			start: 0, // Reset to start of results in api
			rows: 12,
			searchField: searchQuery,
			sortField: 'ss_longlabel',
			sortDir: 'asc',
			collectionCode: '(awdl%20OR%20egypt)'
		});

		contentStore.set(newData);
	};

	return (
		<form onSubmit={handleSubmit} role="search" className="dl-search">
			<input
				id="q"
				name="q"
				type="text"
				className="searchfield"
				defaultValue={searchField === '*:*' ? '' : searchField}
				placeholder="Search titles, subjects, authors..."
				title="Enter the terms you wish to search for."
				aria-label="Search"
				ref={inputRef}
			/>
			<button type="submit" aria-label="submit" value="submit" className="submit-search">
				<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
				</svg>
			</button>
		</form>
	);
}

export default SearchForm;
