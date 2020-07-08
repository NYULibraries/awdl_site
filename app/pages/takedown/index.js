const shared = require('../../../content.js');

module.exports = {
  id: 'takedown',
  title: 'Takedown Policy',
  route: '/takedown/index.html',
  menu: shared.menu,
  class: 'page',
  content: {
    header: shared.content.header,
    partners: shared.content.partners,    
    main: {
      title: 'Takedown Policy',
      localsource: 'main.content.html',
    },
    aside: {},
  },
  assets: {
    js: [
      'commons.js', 
      'crossframe.js'
    ],
  },
};
