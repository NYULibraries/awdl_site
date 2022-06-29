const shared = require('../../../content.js');
const {
  get
} = require('hephaestus');

const viewer = get('VIEWER');

module.exports = {
  id: 'book',
  title: 'Book',
  route: '/books/index.html',
  menu: shared.menu,
  content: {
    header: shared.content.header,
    partners: shared.content.partners,      
    viewer: viewer
  },
  assets: {
    js: [
      'commons.js', 
      'books.js'
    ]
  }
};
