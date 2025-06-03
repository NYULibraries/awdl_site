import React, { useEffect } from 'react';
import { contentStore, searchFieldStore } from '../../stores/contentStore';

interface StoreInitializerProps {
	initialData: any;
	initialSearchField?: string;
	children: React.ReactNode;
}

const StoreInitializer: React.FC<StoreInitializerProps> = ({ initialData, initialSearchField, children }) => {
	useEffect(() => {
		contentStore.set(initialData);
		if (initialSearchField) {
			searchFieldStore.set(initialSearchField);
		}
	}, [initialData, initialSearchField]);

	return <>{children}</>;
};

export default StoreInitializer;
