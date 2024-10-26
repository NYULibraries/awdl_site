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
    is_ispartofseries: boolean;
  };
}

const SeriesItem: React.FC<SeriesItemProps> = ({ document }) => {
  const {
    ss_series_label,
    ss_series_identifier,
    is_ispartofseries,
    bs_status,
  } = document;

  return bs_status ? (
    <article className="item">
      <div className="card">
        <a href="/ancientworld/series/through-the-eye-series">
          {ss_series_label}
        </a>
      </div>
    </article>
  ) : null;
};

export default SeriesItem;
