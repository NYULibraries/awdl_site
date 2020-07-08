const shared = require('../../../content.js');

module.exports = {
  id: 'about',
  title: 'About',
  route : '/about/index.html',
  menu: shared.menu,
  content: {
    header: shared.content.header,
    partners: shared.content.partners,
    main: {
      title: 'About',
      localsource: 'content.main.html'
    },
    aside: {
      title: 'About the ISAW library',
      localsource: 'content.aside.html'
    }
  },
  assets: {
    js: [
      'commons.js',
      'crossframe.js'
    ]
  }
};
