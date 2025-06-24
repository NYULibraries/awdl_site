import React, { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { filterStore, pageStore, contentStore, searchFieldStore } from '../../../stores/contentStore';
import { fetchSolrData } from '../../../Util/fetch';

const FilterDropdown = () => {
	const filter = useStore(filterStore);
	const searchquery = useStore(searchFieldStore);
	const selectRef = useRef<HTMLSelectElement>(null);

	const handleSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedOption = e.target.options[e.target.selectedIndex];
		const field = e.target.value;
		const direction = selectedOption.getAttribute('data-sort-dir') as 'asc' | 'desc';

		filterStore.set({ field, direction });
		// Reset pagination
		pageStore.set(1);

		const newData = await fetchSolrData({
			start: 0,
			rows: 12,
			searchField: searchquery,
			sortField: field,
			sortDir: direction,
			collectionCode: '(awdl%20OR%20egypt)'
		});

		contentStore.set(newData);
	};

	useEffect(() => {
		if (selectRef.current) {
			// Find the option that matches both field and direction
			const options = selectRef.current.options;
			for (let i = 0; i < options.length; i++) {
				const option = options[i];
				if (option.value === filter.field && option.getAttribute('data-sort-dir') === filter.direction) {
					selectRef.current.selectedIndex = i;
					break;
				}
			}
		}
	}, [filter.field, filter.direction]);

	return (
		<div className="filters">
			<select id="browse-select" aria-label="Search Books" onChange={handleSortChange} ref={selectRef}>
				<option data-sort-dir="asc" value="ss_longlabel">
					Sort by Title
				</option>
				<option data-sort-dir="asc" value="ss_sauthor">
					Sort by Author
				</option>
				<option data-sort-dir="asc" value="iass_timestamp">
					Sort by Year Asc.
				</option>
				<option data-sort-dir="desc" value="iass_timestamp">
					Sort by Year Desc.
				</option>
			</select>
		</div>
	);
};

export default FilterDropdown;
