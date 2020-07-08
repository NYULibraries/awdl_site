const { get, Page } = require('hephaestus');

// https://github.com/mdevils/node-html-entities
const Entities = require('html-entities').AllHtmlEntities;

// https://github.com/pid/speakingurl
const getSlug = require('speakingurl');

const _ = require('lodash');

const axios = require('axios');

module.exports = class Series extends Page {
  
  async nodes() {
    let nodes = [];
    try {
      
      const entities = new Entities();

      const collectionCode = get('COLLECTION_CODE');

      const discovery = get('DISCOVERY');

      // We request all nodes that are type (bundle: https://www.drupal.org/node/1261744) dlts_series
      // and match the collection code of this project. By default we sort by ss_series_label
      const src = `${discovery}?fl=*&fq=bundle:dlts_series&fq=sm_series_code:${collectionCode}&sort=ss_series_label%20asc&rows=1000&wt=json`;
    
      const response = await axios.get(src);

      if (response?.status === 200 && response?.data?.response?.docs) {
        nodes = response.data.response.docs.map(doc => {
          if (doc.bs_status) {
            return {
              identifier : doc.ss_identifier,
              entity_id : doc.entity_id,
              label : doc.ss_series_label,
              route : getSlug(entities.decode(doc.label)),
              series_code : doc.sm_series_code,
              data : JSON.parse(doc.zs_data)
            };
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
    return nodes;
  }

  async init() {

    const shared = require('../../../content.js');

    const nodes = await this.nodes();

    const data = {
      id: 'series',
      title: 'Series',
      menu: shared.menu,
      route: '/series/index.html',
      content: {
        nodes: nodes,
        header: shared.content.header,
        partners: shared.content.partners,
      },
      datasource: {
        drupal_subjects: get('VIEWER'),
        subjects: get('DISCOVERY'),
      }
    };

    this.addJS(['commons.js', 'crossframe.js'])

    this.render(data);

  }
}
