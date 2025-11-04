import { ConfigProvider, Pagination, type ThemeConfig } from 'antd';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

interface SearchPaginationProps {
  rows: number;
  seriesIdentifier?: string;
}

function SearchPagination({ rows = 12, seriesIdentifier }: SearchPaginationProps) {
  const theme: ThemeConfig = {
    components: {
      Pagination: {
        colorPrimary: '#ffffff',
        itemActiveBg: '#8A0707',
      },
    },
  };

  const { data } = usePage().props as unknown as { data: { numFound: number; page?: number; queryText?: string } };
  const currentPage = data?.page || 1;
  const numFound = data?.numFound || 0;
  const queryText = data?.queryText;

  const onChange = (page: number) => {
    const pathname = window.location.pathname;

    // only include 'q' if it's not empty and not the default
    const params: Record<string, string> = {};
    if (queryText && queryText !== '*:*') {
      params.q = queryText;
    }
    params.page = page.toString();

    router.get(pathname, params, {
      only: ['data'],
    });
  };

  if (!numFound || !rows || numFound < 1) {
    return null;
  }

  return (
    <ConfigProvider theme={theme}>
      <Pagination
        data-testid='search-pagination'
        current={currentPage}
        showSizeChanger={false}
        pageSize={rows}
        hideOnSinglePage={true}
        total={numFound}
        onChange={onChange}
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          marginTop: '2em',
        }}
      />
    </ConfigProvider>
  );
}

export default SearchPagination;
