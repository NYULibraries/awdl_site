import { z } from 'zod';
import { condensedUrl } from './Urls';

// Define the document schema
const DocumentSchema = z
	.object({
		ss_book_identifier: z.string(),
		ss_uri: z.string().optional(),
		ss_title_long: z.string(),
		sm_author: z.array(z.string()).optional(),
		sm_series: z.array(z.string()).optional(),
		sm_publisher: z.array(z.string()).optional(),
		sm_field_publication_location: z.array(z.string()).optional(),
		ss_publication_date_text: z.string().optional(),
		zm_subject: z.array(z.string()).optional(),
		zm_provider: z.array(z.string()).optional(),
		ss_series_label: z.string().optional(),
		bs_status: z.boolean().optional()
	})
	.passthrough();

// Define the Solr response schema
const SolrResponseSchema = z.object({
	responseHeader: z.record(z.unknown()),
	response: z.object({
		numFound: z.number(),
		start: z.number(),
		docs: z.array(DocumentSchema)
	})
});

type SolrResponse = z.infer<typeof SolrResponseSchema>;

const defaultResponse: SolrResponse = {
	responseHeader: {},
	response: {
		numFound: 0,
		start: 0,
		docs: []
	}
};

export async function fetchCSR(url: string = condensedUrl): Promise<SolrResponse> {
	try {
		const response = await fetch(url, {
			headers: {
				Accept: 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		const validated = SolrResponseSchema.safeParse(data);

		if (!validated.success) {
			console.error('Validation errors:', validated.error.errors);
			throw new Error('Invalid response structure');
		}

		return validated.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		return defaultResponse;
	}
}

export type { SolrResponse };
export { DocumentSchema, SolrResponseSchema };
