interface SearchHeaderProps {
  query: string;
  seriesLabel?: string;
}

export default function SearchHeader({ query, seriesLabel }: SearchHeaderProps) {
  if (seriesLabel) {
    return <h1 className='page-title'>{seriesLabel}</h1>;
  }

  if (query === '*:*') {
    return <h1 className='page-title'>Browse titles</h1>;
  }

  return (
    <h1 className='page-title'>
      Search Results for: <span className='s-query'>{query}</span>
    </h1>
  );
}

