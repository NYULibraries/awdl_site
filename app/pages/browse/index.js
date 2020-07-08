const { get } = require('hephaestus');

const shared = require('../../../content.js');

module.exports = {
  id: 'browse',
  title: 'Browse titles',
  route: '/browse/index.html',
  menu: shared.menu,
  content: {
    header: shared.content.header,
    partners: shared.content.partners,
    top: {
      title: 'Browse titles'
    },
    items: {
      datasource: get('DISCOVERY'),
      rows: 12,
      fl: ['*'],
      fq: [
        {
          filter: 'bundle',
          value: 'dlts_book'
        },
        {
          filter: 'sm_collection_code',
          value: 'awdl'
        }
      ],
      features: {
        filters: [
          {
            direction: 'asc',
            field: 'iass_longlabel',
            labelActive: 'Sorting by Title',
            labelInactive: 'Sort by Title',
            selected: true
          },
          {
            direction: 'asc',
            field: 'ss_sauthor',
            labelActive: 'Sorting by Author',
            labelInactive: 'Sort by Author',
            selected: false
          }
        ]
      }
    }
  },
  assets: {
    js: [ 
      'speakingurl.js', 
      'commons.js', 
      'browse.js'
    ],
    hbs: [
      {
        template: 'items.hbs',
        id: 'items'
      }
    ]
  },
};
