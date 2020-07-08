const shared = require('../../../content.js');

module.exports = {
  id: 'book',
  title: 'Book',
  route: '/books/index.html',
  menu: shared.menu,
  content: {
    header: shared.content.header,
    partners: shared.content.partners,      
    viewer: 'http://sites.dlib.nyu.edu/viewer'
  },
  assets: {
    js: [
      'commons.js', 
      'crossframe.js', 
      'books.js'
    ]
  }
};
