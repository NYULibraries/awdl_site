import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const ResponseTypeSchema = z.union([
	z.object({
		// Api response structure
		numFound: z.number(),
		start: z.number(),
		docs: z.array(z.record(z.unknown()))
	}),
	z.object({
		// Solr response structure
		responseHeader: z.record(z.unknown()),
		response: z.object({
			numFound: z.number(),
			start: z.number(),
			docs: z.array(z.record(z.unknown()))
		})
	})
]);

export type ResponseType = z.infer<typeof ResponseTypeSchema>;

const useFetchData = (query: string) => {
	return useQuery<ResponseType>({
		queryKey: ['responseData', query],
		queryFn: async () => {
			const response = await fetch(query);
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			const data = await response.json();
			try {
				return ResponseTypeSchema.parse(data);
			} catch (error) {
				console.error('Data validation failed:', error);
				throw new Error('Data validation failed');
			}
		},
		staleTime: 60000, // Cache for 60 seconds
		gcTime: 5 * 60 * 1000, // Garbage collection time 5 min
		refetchOnWindowFocus: false
	});
};

export default useFetchData;
