import React, { useEffect, useRef } from 'react';

const FilterDropdown = () => {
	// const $sortField = useStore(sort);
	// const $sortedBySubject = useStore(sortedBySubject);
	// const selectRef = useRef(null);

	// const changeSortType = (e) => {
	// 	changeSortStore(e);
	// 	changePageNumStore(1);
	// };

	// useEffect(() => {
	// 	if (selectRef.current) {
	// 		selectRef.current.value = $sortField;
	// 	}
	// }, [$sortField]);

	return (
		<div className="filters">
			<select
				id="browse-select"
				aria-label="Search Books"
				// defaultValue={$sortField}
				// onChange={(e) => {
				// 	return changeSortType(e.target.value);
				// }}
				// ref={selectRef}
			>
				<option data-sort-dir="asc" value="ss_longlabel">
					Sort by Title
				</option>
				<option data-sort-dir="asc" value="ss_sauthor">
					Sort by Author
				</option>
				<option data-sort-dir="asc" value="iass_timestamp">
					Sort by Year Ascending
				</option>
				<option data-sort-dir="desc" value="iass_timestamp">
					Sort by Year Descending
				</option>
			</select>
		</div>
	);
};

export default FilterDropdown;
