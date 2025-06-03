import React, { useEffect } from 'react';
import { contentStore, searchFieldStore } from '../../stores/contentStore';

interface StoreInitializerProps {
	initialData: any;
	children: React.ReactNode;
}

const StoreInitializer: React.FC<StoreInitializerProps> = ({ initialData, children }) => {
	useEffect(() => {
		contentStore.set(initialData);
		// Initialize searchFieldStore with the search field from the data
		const searchField = initialData?.responseHeader?.params?.q || '*:*';
		searchFieldStore.set(searchField);
	}, [initialData]);

	return <>{children}</>;
};

export default StoreInitializer;
