import React, { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { filterStore, pageStore, contentStore } from '../../../stores/contentStore';
import { fetchSolrData } from '../../../Util/fetch';

const FilterDropdown = () => {
	const filter = useStore(filterStore);
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
			searchField: '*:*',
			sortField: field,
			sortDir: direction,
			collectionCode: '(awdl%20OR%20egypt)'
		});

		contentStore.set(newData);
	};

	useEffect(() => {
		if (selectRef.current) {
			selectRef.current.value = filter.field;
		}
	}, [filter.field]);

	return (
		<div className="filters">
			<select
				id="browse-select"
				aria-label="Search Books"
				value={filter.field}
				onChange={handleSortChange}
				ref={selectRef}
			>
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
