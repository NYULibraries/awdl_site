import React from 'react';

interface SeriesItemProps {}

const SeriesItem: React.FC<SeriesItemProps> = () => {
  const baseURL: string = import.meta.env.BASE_URL;

  return (
    <article className="item">
      <div className="card">
        <a href="/ancientworld/series/through-the-eye-series">
          "Through the eye" series
        </a>
      </div>
    </article>
  );
};

export default SeriesItem;
