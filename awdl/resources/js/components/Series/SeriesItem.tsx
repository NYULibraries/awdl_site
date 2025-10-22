import React from 'react';

export interface SeriesItemProps {
  document: {
    bundle: 'dlts_series';
    // Series name
    ss_series_label: string;
    path_alias: string;
    // Series id
    ss_series_identifier: string;
    // Should it be published
    bs_status: boolean;
    is_ispartofseries: number;
  };
}

const SeriesItem: React.FC<SeriesItemProps> = ({ document }) => {
  /* eslint-disable camelcase */
  const { ss_series_label, path_alias, bs_status } = document;
  /* eslint-enable camelcase */

  const baseURL = '';

  // eslint-disable-next-line camelcase
  return bs_status ? (
    <article className='item'>
      <div className='card'>
        <a href={`${baseURL}/series/${path_alias}`}>
          {/* eslint-disable-next-line camelcase */}
          {ss_series_label}
        </a>
      </div>
    </article>
  ) : null;
};

export default SeriesItem;
