import React, { createContext, useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useFetchData from './useFetchData';

const queryClient = new QueryClient();

export const FetchedDataContext = createContext<ReturnType<typeof useFetchData> | undefined>(undefined);

export const useFetchedData = () => {
  const context = useContext(FetchedDataContext);
  // if (context === undefined) {
  //   throw new Error('useFetchedData must be used within a QueryWrapper');
  // }
  return context;
};

interface QueryWrapperProps {
  children: React.ReactNode;
}

const QueryWrapper: React.FC<QueryWrapperProps> = ({ children }) => {
  const queryResult = useFetchData();

  return (
    <QueryClientProvider client={new QueryClient()}>
      <FetchedDataContext.Provider value={queryResult}>
        {children}
      </FetchedDataContext.Provider>
    </QueryClientProvider>
  );
};

export default QueryWrapper;
