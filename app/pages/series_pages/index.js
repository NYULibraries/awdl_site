const { get, Page } = require('hephaestus');

// https://github.com/mdevils/node-html-entities
const Entities = require('html-entities').AllHtmlEntities;

// https://github.com/pid/speakingurl
const getSlug = require('speakingurl');

const _ = require('lodash');

const axios = require('axios');

module.exports = class SeriesPages extends Page {

  async init() {

    const entities = new Entities();

    const discovery = get('DISCOVERY');

    let collectionCode = get('COLLECTION_CODE');

    const shared = require('../../../content.js');

    /** Source URL template */
    // We request all nodes that are type (bundle: https://www.drupal.org/node/1261744) dlts_series
    // and match the collection code of this project. By default we sort by ss_series_label
    // Use http://underscorejs.org/#template to render the URL that we will use to request data
    const response = await axios.get( `${discovery}?wt=json&fl=*&fq=bundle:dlts_series&fq=sm_series_code:${collectionCode}&rows=1000&hl=off`);

    this.addJS([ 'commons.js', 'speakingurl.js', 'series_pages.js' ]);

    _.each(response.data.response.docs, (doc) => {

      const node = {};

      const identifier = doc.ss_identifier;

      let filters = [
        {
          filter: 'bundle',
          value: 'dlts_book'
        },
        {
          filter: 'sm_collection_code',
          value: collectionCode
        },
        {
          filter: 'sm_series_identifier',
          value: identifier
        },
        {
          filter: 'is_ispartofseries',
          value: 1
        }        
      ];

      if (!doc.bs_status) return;

      if (!doc.zs_data) return;

      node.data = JSON.parse(doc.zs_data);

      node.label = doc.label;

      node.hash = doc.hash;

      node.identifier = identifier;

      node.series_code = doc.sm_series_code;

      const slug = getSlug(
        entities.decode(doc.label.trim())
      );

      this.render({
        id: `seriespage-${doc.ss_identifier}`,
        title: doc.ss_series_label,
        route: `/series/${slug}/index.html`,
        htaccess: false,
        menu: shared.menu,
        content: {
          header: shared.content.header,
          partners: shared.content.partners,            
          node: node,
          top: {
            title: doc.ss_series_label
          },
          items: {
            datasource: discovery,
            rows: 12,
            fl: [ '*' ],
            fq: filters,
            features: {
              filters: [
                {
                  direction: 'asc',
                  field: 'iass_longlabel',
                  label: 'Sorting by Title',
                  selected: true
                },
                {
                  direction: 'asc',
                  field: 'ss_sauthor',
                  label: 'Sort by Author',
                  selected: false
                }
              ]
            }
          }
        }
      });
    });
  }
}
