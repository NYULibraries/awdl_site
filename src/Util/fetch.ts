// src/Util/fetch.ts
import type { SolrResponse } from '../components/Util/fetchCSR';

interface SeriesData {
	series_book_collections: any[];
	series_book_identifier: string;
	series_book_label: string;
	series_book_nid: string;
	series_book_volume_number: string;
	series_book_volume_number_str: string;
	series_identifier: string;
	series_label: string;
	series_nid: string;
}

interface SolrParams {
	start?: number;
	rows?: number;
	searchField?: string;
	sortField?: string;
	sortDir?: 'asc' | 'desc';
	collectionCode?: string;
}

export const getBookFields = (additionalFields: string[] = []): string[] => {
	const baseFields = [
		'ss_book_identifier',
		'ss_uri',
		'ss_title_long',
		'sm_author',
		'zm_series_data_x',
		'sm_series_label',
		'sm_series_identifier',
		'sm_publisher',
		'sm_field_publication_location',
		'ss_publication_date_text',
		'iass_timestamp',
		'sm_provider_nid',
		'sm_provider_label',
		'im_field_subject',
		'sm_subject_label',
		'sm_collection_identifier',
		'bs_status'
	];

	return [...baseFields, ...additionalFields];
};

// Fetch Books
export async function fetchSolrData(
	params: SolrParams = {
		start: 0,
		rows: 12,
		searchField: '*:*',
		sortField: 'ss_longlabel',
		sortDir: 'asc',
		collectionCode: '(awdl%20OR%20egypt)'
	},
	additionalFields: string[] = []
): Promise<SolrResponse> {
	const { start, rows, searchField, sortField, sortDir, collectionCode } = params;

	const fields = getBookFields(additionalFields);

	const fieldString = fields.join(',');

	const baseUrl = 'https://discovery1.dlib.nyu.edu/solr/viewer/select';
	const url = `${baseUrl}?wt=json&q=${searchField}&fl=${fieldString}&fq=sm_collection_code:${collectionCode}&rows=${rows}&start=${start}&sort=${sortField}%20${sortDir}`;

	const response = await fetch(url, {
		headers: {
			Accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();

	if (!data.response || !data.response.docs) {
		throw new Error('Invalid response structure from Solr');
	}

	// Parse zm_series_data_x
	data.response.docs = data.response.docs.map((doc: any) => {
		if (doc.zm_series_data_x && Array.isArray(doc.zm_series_data_x) && doc.zm_series_data_x.length > 0) {
			try {
				doc.zm_series_data_x = JSON.parse(doc.zm_series_data_x[0]) as SeriesData;
			} catch (error) {
				console.warn('Failed to parse zm_series_data_x for document:', doc.ss_book_identifier);
				doc.zm_series_data_x = null;
			}
		}
		return doc;
	});

	return data;
}

// Fetch books by subject or provider PID on subject or provider pages
export const fetchSolrDataByPID = async ({
	start = 0,
	rows = 12,
	pid,
	type
}: {
	start?: number;
	rows?: number;
	pid: string;
	type: 'subject' | 'provider';
}) => {
	const data = await fetchSolrData({
		start,
		rows,
		searchField:
			type === 'subject'
				? `im_field_subject:${pid}` // Use im_field_subject for subject queries
				: `sm_provider_nid:${pid}`, // Use sm_provider_nid for provider queries
		sortField: 'ss_longlabel',
		sortDir: 'asc',
		collectionCode: '(awdl%20OR%20egypt)'
	});

	return data;
};

// Fetch series
export const fetchSeriesData = async (
	params: {
		start?: number;
		rows?: number;
		sortField?: string;
		sortDir?: 'asc' | 'desc';
		collectionCode?: '(awdl%20OR%20egypt)';
	} = {}
) => {
	const {
		start = 0,
		rows = 150,
		sortField = 'ss_series_label',
		sortDir = 'asc',
		collectionCode = '(awdl%20OR%20egypt)'
	} = params;

	const fields = ['ss_series_label', 'path_alias', 'ss_series_identifier', 'bs_status'];

	const fieldString = fields.join(',');

	const baseUrl = 'https://discovery1.dlib.nyu.edu/solr/viewer/select';
	const url = `${baseUrl}?wt=json&q=*:*&fl=${fieldString}&fq=bundle:dlts_series&fq=sm_series_code:${collectionCode}&rows=${rows}&start=${start}&sort=${sortField}%20${sortDir}`;

	const response = await fetch(url, {
		headers: {
			Accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();

	if (!data.response || !data.response.docs) {
		throw new Error('Invalid response structure from Solr');
	}

	// Remove '/content' prefix from path_alias
	data.response.docs = data.response.docs.map((doc: any) => ({
		...doc,
		path_alias: doc.path_alias?.startsWith('content') ? doc.path_alias.substring(8) : doc.path_alias
	}));

	return data;
};

// Fetch books by series identifier on seriesPID page
export const fetchSolrDataBySeriesIdentifier = async ({
	start = 0,
	rows = 12,
	seriesIdentifier,
	sortField = 'ss_longlabel',
	sortDir = 'asc',
	additionalFields = []
}: {
	start?: number;
	rows?: number;
	seriesIdentifier: string;
	sortField?: string;
	sortDir?: 'asc' | 'desc';
	additionalFields?: string[];
}) => {
	const fields = getBookFields(additionalFields);

	const fieldString = fields.join(',');

	const baseUrl = 'https://discovery1.dlib.nyu.edu/solr/viewer/select';
	const url = `${baseUrl}?wt=json&q=*:*&fl=${fieldString}&fq=sm_collection_code:(awdl%20OR%20egypt)&fq=sm_series_identifier:${seriesIdentifier}&rows=${rows}&start=${start}&sort=${sortField}%20${sortDir}`;

	const response = await fetch(url, {
		headers: {
			Accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();

	if (!data.response || !data.response.docs) {
		throw new Error('Invalid response structure from Solr');
	}

	return data;
};
