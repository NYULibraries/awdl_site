import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';

interface ApiResponse {
  response: {
    numFound: number;
    docs: any[];
  };
}

const Content: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://discovery1.dlib.nyu.edu/solr/viewer/select?wt=json&q=*:*&fl=*&fq=sm_collection_code:awdl&rows=12&start=1&sort=ss_longlabel%20asc',
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
          console.log('as');
        }
        const result: ApiResponse = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        setError('An error occurred while fetching data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...h</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <p>Number of documents found: {data?.response.numFound}</p>
      <div
        id="yui_3_18_1_1_1729599236628_89"
        className="yui3-widget yui3-tabview"
      >
        <div
          id="YUItabs"
          data-label="Tabs"
        //   className="noFouc tabHolder yui3-tabview-content"
        //   style="opacity: 1;"
        >
          <ul className="yui3-tabview-list" role="tablist">
            <li
              className="yui3-tab yui3-widget yui3-tab-selected"
              id="yui_3_18_1_1_1729599236628_100"
              role="presentation"
            >
              <h3>Recently Added Titles</h3>
              <a
                id="yui_3_18_1_1_1729599236628_108"
                className="yui3-tab-content yui3-tab-label"
                role="tab"
                // tabindex="0"
              ></a>
            </li>
          </ul>
          <div className="tabContentHolder yui3-tabview-panel">
            <div id="awdlAtlas" className="yui3-tab-panel"></div>

            <div
              id="recently-added-titles"
              className="yui3-tab-panel yui3-tab-panel-selected"
              role="tabpanel"
              aria-labelledby="yui_3_18_1_1_1729599236628_108"
            >
              <h3>Recently Added Titles</h3>
              <div className="item-list flex-container">
                {data?.response.docs.map((doc, index) => (
                  <BookItem document={doc} />
                ))}
                <article className="item"></article>
                <article className="item"></article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
