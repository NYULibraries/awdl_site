import { getBookFields } from '../../Util/fetch';

const collectionCode = '(awdl%20OR%20egypt)';
const fieldString = getBookFields().join(',');
export const solrUrl = `https://discovery1.dlib.nyu.edu/solr/viewer/select?wt=json&q=*:*&fl=*&fq=sm_collection_code:awdl&rows=12&start=0&sort=ss_longlabel%20asc`;
export const condensedUrl = `https://discovery1.dlib.nyu.edu/solr/viewer/select?wt=json&q=*:*&fl=${fieldString}&fq=sm_collection_code:${collectionCode}&rows=12&start=0&sort=ss_longlabel%20asc`;
// Solr url for series
export const seriesSolrUrl = `https://discovery1.dlib.nyu.edu/solr/viewer/select?fl=*&fq=bundle:dlts_series&fq=sm_series_code:${collectionCode}&sort=ss_series_label%20asc&rows=1000&wt=json`;
// Api url
export const apiUrl = `https://sites.dlib.nyu.edu/viewer/api/v1/search?indent=on&query=*:*&fl=*&fq=sm_collection_code:(awdl OR egypt)&rows=12&start=1&sort=ss_longlabel%20asc`;
