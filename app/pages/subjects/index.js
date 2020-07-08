const _ = require('lodash');

const axios = require('axios');

const { 
  appDir,
  exists,
  get,
  write,
  read,
  Page 
} = require('hephaestus');

module.exports = class Subjects extends Page {
  
  async init() {

    const shared = require('../../../content.js');

    const subjectsPath = `${appDir()}/app/datasource/subjects.json`;

    const discoverySubjectsPath = `${appDir()}/app/datasource/discoverySubjects.json`;

    const subjectUrl = `${get('VIEWER')}/sources/field/field_subject`;
    
    const discoveryUrl = `${get('DISCOVERY')}?wt=json&rows=0&facet=true&facet.field=im_field_subject&fq=sm_collection_code:${get('COLLECTION_CODE')}&facet.mincount=1&facet.limit=1000000`;

    let subjects = '';

    let discoverySubjects = '';

    this.addJS([ 'commons.js', 'crossframe.js' ]);

    /** we need the list of Drupal 7 subjects */
    /** we use Viewer's API endpoint to collect this information */
    /** Example: http://stage-dl-pa.home.nyu.edu/viewer/sources/field/field_subject */
    if (exists(subjectsPath)) {
      subjects = read.json(subjectsPath);
    } else {
      try {
        const response_subjects = await axios.get(subjectUrl);
        subjects = response_subjects.data;
        write(subjectsPath, JSON.stringify(subjects));  
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    }

    if (exists(discoverySubjectsPath)) {
      discoverySubjects = read.json(discoverySubjectsPath);
    } else {
      try {
        const responseDiscoverySubjects = await axios.get(discoveryUrl);
        discoverySubjects = responseDiscoverySubjects.data.facet_counts.facet_fields.im_field_subject;
        write(discoverySubjectsPath, JSON.stringify(discoverySubjects));  
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    }

    const terms = discoverySubjects.map((doc, index) => {
      if ((index + 1) % 2) {
        const term = _.find(subjects, { raw_value: doc });
        if (term) {
          return { 
            tid: term.raw_value,
            label: term.value
          };
        }         
      }
    }).filter(term => {
      if (term) return term;
    });

    this.render({
      id: 'subjects',
      title: 'Subjects',
      menu: shared.menu,
      route: '/subjects/index.html',
      content: {
        header: shared.content.header,
        partners: shared.content.partners,
        terms: terms
      },
    });

  }
}
