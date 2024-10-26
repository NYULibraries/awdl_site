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
    ss_series_label: string;
  };
}

const SeriesItem: React.FC<SeriesItemProps> = ({ document }) => {
  const { ss_series_label, sm_series_identiier, is_ispartofseries, bs_status } = document;

  return (
    <article className="item">
      <div className="card">
        <a href="/ancientworld/series/through-the-eye-series">
          {ss_series_label}
        </a>
      </div>
    </article>
  );
};

export default SeriesItem;
