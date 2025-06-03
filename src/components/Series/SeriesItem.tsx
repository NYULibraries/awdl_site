import React from 'react';

export interface SeriesItemProps {
	document: {
		sm_field_identifier: string[];
		ss_title_long: string;
		sm_author: string[];
		sm_series: any;
		sm_publisher: string[];
		sm_field_publication_location: string[];
		ss_publication_date_text: string;
		zm_subject: string[];
		zm_provider: string[];
		bundle: 'dlts_series';
		// Series name
		ss_series_label: string;
		// Series id
		ss_series_identifier: string;
		// Should it be published
		bs_status: boolean;
		is_ispartofseries: number;
	};
}

const SeriesItem: React.FC<SeriesItemProps> = ({ document }) => {
	/* eslint-disable camelcase */
	const { ss_series_label, ss_series_identifier, is_ispartofseries, bs_status } = document;
	/* eslint-enable camelcase */

	const baseURL: string = import.meta.env.BASE_URL;

	// eslint-disable-next-line camelcase
	return bs_status ? (
		<article className="item">
			<div className="card">
				<a href={`${baseURL}series/through-the-eye-series`}>
					{/* eslint-disable-next-line camelcase */}
					{ss_series_label}
				</a>
			</div>
		</article>
	) : null;
};

export default SeriesItem;
