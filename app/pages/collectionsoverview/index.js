const shared = require('../../../content.js');

module.exports = {
  id: 'collections-overview',
  title: 'Collections Overview',
  route: '/collectionsoverview/index.html',
  menu: shared.menu,
  content: {
    header: shared.content.header,
    partners: shared.content.partners,
    main: {
      title: 'Collections Overview',
      localsource: 'main.content.html',
    },
    aside: {
      title: 'AWDL Atlas',
      localsource: 'aside.content.html',
    }
  },
  assets: {
    js: [
      'commons.js',
      'crossframe.js'
    ]
  }
};
