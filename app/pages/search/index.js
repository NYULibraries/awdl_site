const shared = require('../../../content.js');

const { get } = require('hephaestus');

module.exports = {
  id: 'search',
  title: 'Search Results',
  route: '/search/index.html',
  menu: shared.menu,
  content: {
    header: shared.content.header,
    partners: shared.content.partners,    
    top: {
      title: 'Search Results',
    },
    items: {
      datasource: get('DISCOVERY'),
      rows: 12,
      fl: ['*'],
      fq: [
        {
          filter: 'bundle',
          value: 'dlts_book',
        },
        {
          filter: 'sm_collection_code',
          value: 'awdl',
        },
      ],
      features: {
        filters: [
          {
            direction: 'asc',
            field: 'iass_longlabel',
            labelActive: 'Sorting by Title',
            labelInactive: 'Sort by Title',
            selected: true,
          },
          {
            direction: 'asc',
            field: 'ss_sauthor',
            labelActive: 'Sorting by Author',
            labelInactive: 'Sort by Author',
            selected: false,
          },
        ],
      },
    },
  },
  assets: {
    js: [
      'commons.js', 
      'speakingurl.js', 
      'search.js'
    ],
    hbs: [
      {
        template: 'items.hbs',
        id: 'items',
      },
    ],
  },
};
