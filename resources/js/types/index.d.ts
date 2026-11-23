import type { Config } from 'ziggy-js';

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  ziggy: Config & { location: string };
  [key: string]: unknown;
}

export interface SeriesData {
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

export interface ItemCardProps {
  identifier: string;
  title: string;
  bundle?: string;
  authors: string[];
  seriesData: SeriesData[][] | null;
  publisher: string[];
  publicationPlace: string[];
  publicationDate: string;
  providerIds: string[];
  subjectIds: number[];
  providerLabels: string[];
  subjectLabels: string[];
  bs_status: boolean;
  ss_series_label: string[];
  series: Record<string, { identifier: string; label: string }>;
}
