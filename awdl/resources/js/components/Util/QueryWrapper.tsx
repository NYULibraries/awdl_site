import React, { createContext, useContext } from 'react';
import { QueryClient } from '@tanstack/react-query';
import useFetchData from './useFetchData';

export const FetchedDataContext = createContext<ReturnType<typeof useFetchData> | undefined>(undefined);

export const queryClient = new QueryClient();

export const useFetchedData = () => {
	const context = useContext(FetchedDataContext);
	if (context === undefined) {
		throw new Error('useFetchedData must be used within a QueryWrapper');
	}
	return context;
};

interface QueryWrapperProps {
	children: React.ReactNode;
	query: string;
}

const QueryWrapper: React.FC<QueryWrapperProps> = ({ children, query }) => {
	const queryResult = useFetchData(query);

	return <FetchedDataContext.Provider value={queryResult}>{children}</FetchedDataContext.Provider>;
};

export default QueryWrapper;
