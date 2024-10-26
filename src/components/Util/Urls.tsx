const fields = [
  'ss_book_identifier',
  'ss_uri',
  'ss_title_long',
  'sm_author',
  'sm_series',
  'sm_publisher',
  'sm_field_publication_location',
  'ss_publication_date_text',
  'zm_subject',
  'zm_provider',
  'ss_series_label',
  'bs_status',
];

const createFieldString = (fieldsArray: string[]): string => {
  return fieldsArray.join(',');
};

const collectionCode = '(awdl%20OR%20egypt)';
const fieldString = createFieldString(fields);
export const solrUrl = `https://discovery1.dlib.nyu.edu/solr/viewer/select?wt=json&q=*:*&fl=*&fq=sm_collection_code:awdl&rows=12&start=1&sort=ss_longlabel%20asc`;
export const condensedUrl = `https://discovery1.dlib.nyu.edu/solr/viewer/select?wt=json&q=*:*&fl=${fieldString}&fq=sm_collection_code:${collectionCode}&rows=12&start=1&sort=ss_longlabel%20asc`;
// Solr url for series
export const seriesSolrUrl = `https://discovery1.dlib.nyu.edu/solr/viewer/select?fl=*&fq=bundle:dlts_series&fq=sm_series_code:${collectionCode}&sort=ss_series_label%20asc&rows=1000&wt=json`;
// Api url
export const apiUrl = `https://sites.dlib.nyu.edu/viewer/api/v1/search?indent=on&query=*:*&fl=*&fq=sm_collection_code:(awdl OR egypt)&rows=12&start=1&sort=ss_longlabel%20asc`;
