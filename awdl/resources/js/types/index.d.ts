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

export interface BookItemProps {
  ss_book_identifier: string;
  ss_title_long: string;
  sm_author: string[];
  zm_series_data_x: SeriesData[] | null;
  ss_series_label: string[];
  sm_publisher: string[];
  sm_field_publication_location: string[];
  ss_publication_date_text: string;
  sm_provider_nid: string[];
  im_field_subject: number[];
  sm_provider_label: string[];
  sm_subject_label: string[];
  bs_status: boolean;
}

interface BookItemDocument {
  ss_book_identifier: string;
  ss_title_long?: string;
  sm_author?: string[];
  zm_series_data_x?: SeriesData[];
  sm_publisher?: string[];
  sm_field_publication_location?: string[];
  ss_publication_date_text?: string;
  bs_status?: string;
  sm_provider_nid?: string[];
  im_field_subject?: string[];
  sm_provider_label?: string[];
  sm_subject_label?: string[];
  [key: string]: any;
}
