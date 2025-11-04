import React, { useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

const FilterDropdown: React.FC = () => {
  const { data } = usePage().props as unknown as { data: { queryText?: string; sortField?: string } };
  const { queryText, sortField } = data || { queryText: '*:*' as string, sortField: 'ss_longlabel' as string };
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const field = e.target.value;
    const pathname = window.location.pathname;

    // set new sort params, set q param only if it exists
    const params: Record<string, string> = {};
    if (queryText && queryText !== '*:*') {
      params.q = queryText;
    }
    params.sortfield = field;
    params.page = '1';

    router.get(pathname, params, {
      only: ['data'],
    });
  };

  useEffect(() => {
    if (selectRef.current) {
      const options = selectRef.current.options;
      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        if (option.value === sortField) {
          selectRef.current.selectedIndex = i;
          break;
        }
      }
    }
  }, [sortField]);

  return (
    <div className='filters'>
      <select id='browse-select' aria-label='Search Books' onChange={handleSortChange} ref={selectRef}>
        <option data-sort-dir='asc' value='ss_longlabel'>
          Sort by Title
        </option>
        <option data-sort-dir='asc' value='ss_sauthor'>
          Sort by Author
        </option>
        {/* TODO: Not sure if we're keeping these options */}
        {/* <option data-sort-dir="asc" value="iass_timestamp">
          Sort by Year Asc.
        </option>
        <option data-sort-dir="desc" value="iass_timestamp">
          Sort by Year Desc.
        </option> */}
      </select>
    </div>
  );
};

export default FilterDropdown;
