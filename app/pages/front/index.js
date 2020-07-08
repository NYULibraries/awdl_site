const axios = require('axios');

const { get, Page } = require('hephaestus');

class Front extends Page {

  async recently_added_titles() {
    const recently_added_titles_url = `${get('DISCOVERY')}?wt=json&fq=sm_collection_code:${get('COLLECTION_CODE')}&fl=*&rows=12&sort=ds_changed%20desc`;
    try {
      const response = await axios.get(recently_added_titles_url);
      if (response.status = 200 && response?.data?.response?.docs) {
        return response.data.response.docs;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
    }
  }

  async init() {
    const shared = require('../../../content.js');
    
    let data = {
      id: 'home',
      route: '/index.html',
      title: 'Home',
      content: {
        header: {},
        partners: [],
        intro: {
          id: 'intro',
          title: 'The Ancient World Digital Library',
          localsource: 'intro.content.html'
        },
        news: {
          src: 'http://isaw.nyu.edu/library/blog/collector/RSS',
          id: 'new-items',
          label: 'News items',
          title: 'ISAW Library Blog',
          link: 'http://isaw.nyu.edu/library/blog/collector'
        },
        featured: {
          id: 'YUItabs',
          label: 'Tabs',
          tabs: [],
          widgets: {
            atlas: {
              label: 'AWDL Atlas',
              id: 'awdlAtlas',
              src: 'https://fusiontables.googleusercontent.com/embedviz?q=select+col4+from+1F9kzSPgjNomW9bCvsp76cdpzewdYImwfkbCXbZDl&viz=MAP&h=false&lat=46&lng=-12&t=3&z=4&l=col4&y=2&tmplt=2&hml=TWO_COL_LAT_LNG'
            },
            items: {
              label: 'Recently Added Titles',
              id: 'recently-added-titles',
              docs: []
            }
          }
        }
      }
    };
    
    this.addJS([
      'front.js',
      'commons.js',
      'crossframe.js'
    ]);

    const recently_added_titles = await this.recently_added_titles();

    data.menu = shared.menu;

    data.content.header = shared.content.header;

    data.content.partners = shared.content.partners;

    data.content.featured.widgets.items.docs = recently_added_titles;

    data.content.featured.tabs.push(
      data.content.featured.widgets.items
    );

    data.content.featured.tabs.push(
      data.content.featured.widgets.atlas
    );

    this.render(data);

  }
}

module.exports = Front;
