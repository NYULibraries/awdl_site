const { get, Page } = require('hephaestus');

const _ = require('lodash');

const axios = require('axios');

module.exports = class Providers extends Page {
  
  async init() {

    async function step1 () {
      /** Use Viewer's API endpoint to collect partners */
      /** Example: http://stage-dl-pa.home.nyu.edu/viewer/sources/field/field_subject */
      const response = await axios(`${get('VIEWER')}/sources/field/field_partner`);
      if (response?.status === 200) {
        return response.data;
      }
    }
    
    async function step3 () {
      /** Use Viewer's API endpoint to collect partners */
      /** Example: http://stage-dl-pa.home.nyu.edu/viewer/sources/field/field_partner */
      // http://dev-discovery.dlib.nyu.edu:8080/solr3_discovery/stage/select?wt=json&fq=sm_collection_code:awdl&rows=0&facet=true&facet.field=sm_collection_partner_label
      const response = await axios(`${get('DISCOVERY')}?wt=json&fq=sm_collection_code:${get('COLLECTION_CODE')}&rows=0&facet=true&facet.field=sm_provider_label`);
      if (response?.status === 200) {
        return response.data;
      }
    }

    const shared = require('../../../content.js');
    
    const providers = [];

    const partners = await step1();

    const terms = partners.map(partner => {
      return {
        nid: partner.raw_value,
        label: partner.value
      };
    });

    const facet = await step3();

    if (facet?.facet_counts?.facet_fields?.sm_provider_label) {
      const labels =facet.facet_counts.facet_fields.sm_provider_label;
      labels.forEach((label, index) => {
        const eq = ((index + 1) % 2);
        // Apache Solr facets in response are list as [ value, count, ... ]
        // check if index it's the label
        if (eq === 1) {
          // only accpet facets with results
          if (labels[index + 1] > 0) {
            if (_.isObject(_.find(terms, { label: label }))) {
              providers.push(_.find(terms, { label: label }));
            }
          }
        }
      });
    }
  
    this.render({
      title: 'Browse by providers',
      id: 'providers',
      route: '/providers/index.html',
      menu: shared.menu,
      content: {
        header: shared.content.header,
        partners: shared.content.partners,
        providers: providers
      },
      datasource: {
        viewer: get('VIEWER'),
        discovery: get('DISCOVERY')
      }
    });

  }
}
