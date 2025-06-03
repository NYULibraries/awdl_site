import { atom } from 'nanostores';
import { type DocumentSchema } from '../components/Util/fetchCSR';
import { z } from 'zod';

interface SolrResponse {
	responseHeader: Record<string, unknown>;
	response: {
		numFound: number;
		start: number;
		docs: z.infer<typeof DocumentSchema>[];
	};
}

interface FilterState {
	field: string;
	direction: 'asc' | 'desc';
}

// solr response data
export const contentStore = atom<SolrResponse | null>(null);

// pagenum
export const pageStore = atom<number>(1);

// filter type
export const filterStore = atom<FilterState>({
	field: 'ss_longlabel',
	direction: 'asc'
});

// query
export const searchFieldStore = atom<string>('*:*');
