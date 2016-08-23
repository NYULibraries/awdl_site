function front (data) {

  'use strict';

  // Agartha should be in in the process Object by now.
  // if not, we are not running inside Agartha CLI; kill
  if (process.agartha === undefined) return;

  const agartha = process.agartha;

  /**
   * we need to run two synchronous tasks
   * - Get the latest blog post from  ISAW Library Blog
   * - Get the list of the recently added titles + render AWDL Atlas
   * we use generators (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
   * and wait (yield 2 times) for this operations to call generator.next()
   * onces the operations are done, we emmit "task.done"
   */
  function* steps () {
    yield;
    yield;
    agartha.emit('task.done', data);
  }

  const generator = steps();

  function Callbacks () {}

  Callbacks.prototype.get_latest_blog_post = (object, generator) => {
    const dateFormat = agartha.dateformat;
    const src = "http://isaw.nyu.edu/library/blog/collector/RSS";
    data.content.news.title = 'ISAW Library Blog';
    data.content.news.link = 'http://isaw.nyu.edu/library/blog/collector';
    agartha.request(src, (error, response, body) => {
      if (error) return;
      const xml2js = require('xml2js');
      const parser = new xml2js.Parser();
      parser.parseString(body, (err, result) => {
        const title = result['rdf:RDF']['channel'][0].title[0];
        const link = result['rdf:RDF']['channel'][0].link[0];
        const description = result['rdf:RDF']['channel'][0].description[0];
        const items = result['rdf:RDF'].item.shift(); /** this widget only show the first item of the RSS feed */
        const date = dateFormat(items['dc:date'][0], "mmmm dS, yyyy");
        const dc_date = items['dc:date'][0];
        data.content.news.post = { title : title, link : link, description : description, dc_date : dc_date, date : date };
        generator.next();
      });
    });
  }

  Callbacks.prototype.render_featured = (object, generator) => {
    const recently_added_titles_url = agartha.get('datasource').discovery.url + '?wt=json&fq=sm_collection_code:awdl&fl=*&rows=12&sort=ds_changed%20desc';
    agartha.request(recently_added_titles_url, (error, response, body) => {
      if (error) return;
      const atlas_url = 'https://www.google.com/fusiontables/embedviz?q=select+col4+from+1F9kzSPgjNomW9bCvsp76cdpzewdYImwfkbCXbZDl&amp;viz=MAP&amp;h=false&amp;lat=46&amp;lng=-12&amp;t=3&amp;z=4&amp;l=col4&amp;y=2&amp;tmplt=2&amp;hml=TWO_COL_LAT_LNG';
      const source = JSON.parse(body);
      data.content.featured.tabs = [];
      data.content.featured.widgets = {};
      data.content.featured.widgets.items = {
        "label" : "Recently Added Titles",
        "id" : "recently-added-titles",
        "docs" : source.response.docs
      };
      data.content.featured.tabs.push(data.content.featured.widgets.items);
      data.content.featured.widgets.atlas = {
        "label" : "AWDL Atlas",
        "id" : "awdlAtlas",
        "src" : atlas_url
      };
      data.content.featured.tabs.push(data.content.featured.widgets.atlas)
      generator.next();
    });
  }

  function start (generator) {
    const callbacks = new Callbacks();
    // start the generator
    generator.next();
    // find out if we need to call a function
    agartha._.each (data.content, (object) => {
      if (agartha._.has(object, 'callback')) callbacks[object.callback](object, generator);
    });
  }

  // run the steps
  start(generator);

}

exports.front = front;