import DefaultLayout from '@/layouts/DefaultLayout';
import { Content as PartnerContent } from '@/components/Partners/partners.md';

<DefaultLayout title="Partners" bodyID="partners" bodyClass="page">
	<div class="container-fluid">
		<div class="flex-container">
			<main class="main" role="main" id="mainContent" tabIndex="-1">
				<h2 class="page-title">Partners</h2>
				<div class="maintext">
					<PartnerContent />
				</div>
			</main>
		</div>
	</div>
</DefaultLayout>
