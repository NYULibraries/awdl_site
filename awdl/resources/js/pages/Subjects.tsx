---
import DefaultLayout from '../../layouts/DefaultLayout';
import { subjectNidToLabelMapping } from '../../Util/pagemaps/subjectMapping.ts';

const baseURL: string = '';
---
<DefaultLayout title="Subjects: Ancient World Digital Library">
	<main class="main container-fluid" role="main" id="mainContent" tabIndex="-1">
		<header>
			<h1 class="page-title">Subjects</h1>
		</header>
		<div>
			<ul>
				{Object.entries(subjectNidToLabelMapping).map(([nid, label]) => (
					<li>
						<a href={`${baseURL}/subjects/${nid}`}>{label}</a>
					</li>
				))}
			</ul>
		</div>
	</main>
</DefaultLayout>
