const shared = require('../../../content.js');

module.exports = {
  id: 'partners',
  title: 'Partners',
  route: '/partners/index.html',
  class: 'page',
  menu: shared.menu,
  content: {
    header: shared.content.header,
    partners: shared.content.partners,    
    main: {
      title: 'Partners',
      localsource: 'main.content.html',
    },
    aside: {},
  },
  assets: {
    js: ['commons.js'],
  },
};
