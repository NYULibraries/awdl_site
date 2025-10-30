---
import DefaultLayout from '../../layouts/DefaultLayout';
import Content from '../components/Content';
import SearchSubheader from '../components/Search/Labels/SearchSubheader';
import SearchPagination from '../components/Search/Tools/SearchPagination';
import { fetchSolrDataByPID } from '../../Util/fetch';
import { contentStore } from '../../stores/contentStore';
import SearchHeader from '../components/Search/Labels/SearchHeader';
import StoreInitializer from '../components/Util/StoreInitializer';

const { subjectPID } = Astro.params;
if (!subjectPID) throw new Error('Subject PID not found');

export const prerender = false;

// Get init url parameters on load
const page = parseInt(Astro.url.searchParams.get('page') || '1');
const rows = 12;
const start = (page - 1) * rows;

const data = await fetchSolrDataByPID({
	start,
	rows,
	pid: subjectPID,
	type: 'subject'
});

// Initialize the content store after fetching data
contentStore.set(data);

// Match subject label to its id
const doc = data?.response?.docs?.[0] as { im_field_subject?: number[]; sm_subject_label?: string[] } | undefined;
const subjectIndex = doc?.im_field_subject?.findIndex((id) => id.toString() === subjectPID);
const subjectLabel = subjectIndex !== undefined && subjectIndex !== -1 ? doc?.sm_subject_label?.[subjectIndex] : '';
---

<DefaultLayout title={subjectLabel || 'Subject'} bodyID="subjects">
	<main class="main container-fluid" role="main" id="mainContent" tabIndex="-1">
		<StoreInitializer initialData={data} initialSearchField={subjectLabel} initialPage={page} client:only="react">
			<SearchHeader client:only="react" />
			<div class="items-widget">
				<div class="top">
					<SearchSubheader
						initialData={{
							response: {
								numFound: data?.response.numFound,
								start: data?.response.start,
								docs: data?.response.docs
							}
						}}
						client:only="react"
					/>
				</div>
				<div
					id="items"
					class="widget items"
					data-name="items"
					data-rows={rows}
					data-source="https://discovery1.dlib.nyu.edu/solr/viewer/select"
					data-fl="*"
					data-fq-bundle="dlts_book"
					data-fq-sm_collection_code="awdl"
					data-numfound={data?.response.numFound}
					data-start={start}
					data-docslength={data?.response.docs.length}
					data-requesterror="0"
				>
					<Content client:only="react" />
				</div>
				<div class="bottom text-center">
					<SearchPagination rows={rows} client:only="react" />
				</div>
			</div>
		</StoreInitializer>
	</main>
</DefaultLayout>
