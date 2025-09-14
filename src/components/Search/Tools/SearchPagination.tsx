import React from 'react';
import { ConfigProvider, Pagination, type ThemeConfig } from 'antd';
import { fetchSolrData, fetchSolrDataBySeriesIdentifier } from '../../../Util/fetch';
import { contentStore, pageStore, searchFieldStore, filterStore } from '../../../stores/contentStore';
import { useStore } from '@nanostores/react';

interface SearchPaginationProps {
	rows: number;
	seriesIdentifier?: string;
}

function SearchPagination({ rows = 12, seriesIdentifier }: SearchPaginationProps) {
	const theme: ThemeConfig = {
		components: {
			Pagination: {
				colorPrimary: '#ffffff',
				itemActiveBg: '#8A0707'
			}
		}
	};

	const contentData = useStore(contentStore);
	const currentPage = useStore(pageStore);
	const searchQuery = useStore(searchFieldStore);
	const filter = useStore(filterStore);

	const onChange = async (page: number) => {
		const start = (page - 1) * rows;

		const newData = seriesIdentifier
			? await fetchSolrDataBySeriesIdentifier({
					start,
					rows,
					seriesIdentifier,
					sortField: filter.field,
					sortDir: filter.direction
				})
			: await fetchSolrData({
					start,
					rows,
					searchField: searchQuery,
					sortField: filter.field,
					sortDir: filter.direction,
					collectionCode: '(awdl%20OR%20egypt)'
				});

		contentStore.set(newData);
		pageStore.set(page);

		// Update URL if we're on the search page
		if (window.location.pathname.includes('/search')) {
			const url = new URL(window.location.href);
			url.searchParams.set('page', page.toString());
			window.history.pushState({}, '', url.toString());
		}
	};

	if (!contentData?.response?.numFound || !rows || contentData.response.numFound < 1) {
		return null;
	}

	return (
		<ConfigProvider theme={theme}>
			<Pagination
				data-testid="search-pagination"
				current={currentPage}
				showSizeChanger={false}
				pageSize={rows}
				hideOnSinglePage={true}
				total={contentData.response.numFound}
				onChange={onChange}
				style={{
					display: 'flex',
					justifyContent: 'center',
					textAlign: 'center',
					marginTop: '2em'
				}}
			/>
		</ConfigProvider>
	);
}

export default SearchPagination;
