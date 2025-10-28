import DefaultLayout from '@/layouts/DefaultLayout';
import { providerNidToLabelMapping } from '../../Util/pagemaps/providerMapping.ts';

<DefaultLayout title="Browse by providers: Ancient World Digital Library">
	<main className="main container-fluid" role="main" id="mainContent" tabIndex="-1">
		<header>
			<h1 className="page-title">Browse by providers</h1>
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
