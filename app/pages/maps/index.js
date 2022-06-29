const { ncp } = require('ncp');
const { appBuildDir, appDir, exists, get, Page } = require('hephaestus');
const { resolve } = require('path');

module.exports = class Maps extends Page {
  
  async init() {
    
    const destination = resolve(appBuildDir(), 'maps/awdl.kml');
    
    const source = resolve(appDir(), 'app/pages/maps/awdl.kml');

    console.log(destination)
    console.log(source)
    
    if (exists(source)) {
      ncp(source, destination, err => {
        if (err) return console.error(err);
      });
    }

    const appUrl = get('APP_URL');

    const gKey = 'AIzaSyA0t6pLZQY-A8Jmo5i2CGWjCra-ePd1lG0';

    const shared = require('../../../content.js');

    const data = {
      id: 'maps',
      title: 'AWDL Atlas',
      menu: shared.menu,
      route: '/maps/index.html',
      appUrl: appUrl,
      gKey: gKey,
      content: {
      }
    };

    this.addJS(['commons.js'])

    this.render(data);

  }
}
