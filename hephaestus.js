const {
  get
} = require('hephaestus');

const gtag = parseInt(get('GTAG'), 10);
const gcode = get('GA_CODE');

module.exports = exports = {
  appName: 'Ancient World Digital Library',
  collectionCode: '(awdl OR egypt)',
  shortName: 'beard',
  appUrl: '/ancientworld',
  appRoot: '/ancientworld',
  version: '0.0.1',
  hephaestus: '2.0.0',
  gtag: gtag,
  gcode: gcode,
};
