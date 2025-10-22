---
import DefaultLayout from '../../layouts/DefaultLayout';
import { providerNidToLabelMapping } from '../../Util/pagemaps/providerMapping.ts';

const baseURL: string = '';
---
<DefaultLayout title="Browse by providers: Ancient World Digital Library">
	<main class="main container-fluid" role="main" id="mainContent" tabIndex="-1">
		<header>
			<h1 class="page-title">Browse by providers</h1>
		</header>
		<div>
			<ul>
				{Object.entries(providerNidToLabelMapping).map(([nid, label]) => (
					<li>
						<a href={`${baseURL}/providers/${nid}`}>{label}</a>
					</li>
				))}
			</ul>
		</div>
	</main>
</DefaultLayout>
