const { get, Page } = require('hephaestus');

const _ = require('lodash');

const axios = require('axios');

module.exports = class ProvidersPages extends Page {

  async init() {

    let terms = [];

    const collectionCode = get('COLLECTION_CODE');

    const discovery = get('DISCOVERY');

    const viewer = get('VIEWER');

    const shared = require('../../../content.js');

    this.addJS([ 'commons.js', 'speakingurl.js', 'providers_pages.js' ]);

    /** Use Viewer's API endpoint to collect partners */
    /** Example: http://stage-dl-pa.home.nyu.edu/viewer/sources/field/field_subject */

    const partners_response = await axios.get(`${viewer}/sources/field/field_partner`);

    if (partners_response?.status === 200) {
      terms = partners_response.data.map(term => {
        return {
          label: term.value,
          nid: term.raw_value
        };
      });
    }

    const labels_response = await axios.get(`${discovery}?wt=json&fq=sm_collection_code:${collectionCode}&rows=0&facet=true&facet.field=sm_provider_label`);

    if (labels_response?.status === 200) {
      const labels = labels_response.data.facet_counts.facet_fields.sm_provider_label;
      const filters = [
        {
          filter: 'bundle',
          value: 'dlts_book'
        },
        {
          filter: 'sm_collection_code',
          value: collectionCode
        }
      ];
      for (let index = 0; index < labels.length; index++) {
        const eq = ((index + 1) % 2);
        // Apache Solr facets in response are list as [ value, count, ... ]
        // check if index it's the label
        if (eq === 1) {
          // only accpet facets with results
          if (labels[index + 1] > 0) {
            const provider = _.find(terms, { label: labels[index] });
            if (provider) {
              this.render(
                {
                  id: `providers-${provider.nid}`,
                  title: provider.label,
                  route: `/providers/${provider.nid}/index.html`,
                  menu: shared.menu,
                  content: {
                    header: shared.content.header,
                    partners: shared.content.partners,
                    top: {
                      label: provider.label,
                      title: 'Provider'
                    },
                    items: {
                      datasource: discovery,
                      rows: 12,
                      fl: [ '*' ],
                      fq: [
                        {
                          'filter': 'sm_provider_nid', 
                          'value': provider.nid
                        }
                      ].concat(filters),
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
                }
              );
            }
          }
        }
      }
    }
  }
}
