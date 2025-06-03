import React from 'react';
import { ConfigProvider, Pagination, type ThemeConfig } from 'antd';
import { fetchSolrData } from '../../../Util/fetch';
import { contentStore, pageStore, searchFieldStore } from '../../../stores/contentStore';
import { useStore } from '@nanostores/react';

interface SearchPaginationProps {
	rows: number;
}

function SearchPagination({ rows = 12 }: SearchPaginationProps) {
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

	const onChange = async (page: number) => {
		const start = (page - 1) * rows;
		const newData = await fetchSolrData({
			start,
			rows,
			searchField: searchFieldStore.get(),
			sortField: 'ss_longlabel',
			sortDir: 'asc',
			collectionCode: '(awdl%20OR%20egypt)'
		});
		contentStore.set(newData);
		pageStore.set(page);
	};

	if (!contentData?.response?.numFound || !rows || contentData.response.numFound < 1) {
		return null;
	}

	return (
		<ConfigProvider theme={theme}>
			<Pagination
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
