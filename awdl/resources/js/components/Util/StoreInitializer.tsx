import React, { useEffect } from 'react';
import { contentStore, searchFieldStore, pageStore } from '../../stores/contentStore';

interface StoreInitializerProps {
	initialData: any;
	initialSearchField?: string;
	initialPage?: number;
	children: React.ReactNode;
}

const StoreInitializer: React.FC<StoreInitializerProps> = ({
	initialData,
	initialSearchField,
	initialPage,
	children
}) => {
	useEffect(() => {
		contentStore.set(initialData);
		if (initialSearchField) {
			searchFieldStore.set(initialSearchField);
		}
		if (initialPage) {
			pageStore.set(initialPage);
		}
	}, [initialData, initialSearchField, initialPage]);

	return <>{children}</>;
};

export default StoreInitializer;
