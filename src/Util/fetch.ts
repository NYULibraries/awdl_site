// src/Util/fetch.ts
import type { SolrResponse } from '../components/Util/fetchCSR';

interface SolrParams {
	start?: number;
	rows?: number;
	searchField?: string;
	sortField?: string;
	sortDir?: 'asc' | 'desc';
	collectionCode?: string;
}

export async function fetchSolrData(
	params: SolrParams = {
		start: 0,
		rows: 12,
		searchField: '*:*',
		sortField: 'ss_longlabel',
		sortDir: 'asc',
		collectionCode: '(awdl%20OR%20egypt)'
	}
): Promise<SolrResponse> {
	const { start, rows, searchField, sortField, sortDir, collectionCode } = params;

	const fields = [
		'ss_book_identifier',
		'ss_uri',
		'ss_title_long',
		'sm_author',
		'sm_series',
		'sm_series_label',
		'sm_publisher',
		'sm_field_publication_location',
		'ss_publication_date_text',
		'iass_timestamp',
		'sm_provider_nid',
		'sm_provider_label',
		'im_field_subject',
		'sm_subject_label',
		'bs_status'
	];

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

	return data;
}

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
