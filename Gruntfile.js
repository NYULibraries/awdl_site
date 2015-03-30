module.exports = function ( grunt ) {

  var _ = require('underscore');

  var pkg = grunt.file.readJSON('package.json');

  var transform = require('transform');

  var configuration = require('./Gruntconfigurations');  

  /** project configuration */
  grunt.initConfig({
    pkg: pkg,
    curl: configuration.curl(),
    clean: configuration.clean(),
    copy: configuration.copy(),
    uglify: configuration.uglify(),
    sass: configuration.sass(),
    watch: configuration.watch()
  });
  
  /** load modules and tasks */
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
    
  /** Reads the RSS feed from "ISAW Library Blog". @TODO: ideally this will be a sub-module */
  grunt.registerTask('isawLibraryBlog', 'isawLibraryBlog', function () {
    var done = this.async();
    var request = require('request');
    var fs = require('fs');
    var xml2js = require('xml2js');
    var parser = new xml2js.Parser();
    var src = "http://isaw.nyu.edu/library/blog/collector/RSS";
    var dest = __dirname + "/source/json/datasources/isawBlog.json";
    request( src, function (error, response, body) {
      if ( ! error && response.statusCode == 200) {
        parser.parseString( body, function ( err, result ) {
          var blogTitle = result['rdf:RDF']['channel'][0].title[0];
          var blogLink = result['rdf:RDF']['channel'][0].link[0];
          var blogDescription = result['rdf:RDF']['channel'][0].description[0];
          /** this widget only show the first item of the RSS feed */
          var items = result['rdf:RDF'].item.shift();
          var feed = {
          	title : blogTitle, 
          	link : blogLink,
          	description : blogDescription,
          	items : [ items ] 
          } ;
          grunt.file.write( dest , JSON.stringify( feed ) );
          done();
        });
      }
    });
  });

  grunt.registerTask('writeHTML', 'writeHTML', function () {
    /** force task into async mode and grab a handle to the "done" function. */
    var done = this.async();
    /** load configuration */
    var conf = grunt.file.readJSON(__dirname + '/source/json/conf.json');
    /** copy source JavaScript files to build */
    grunt.file.recurse(__dirname + '/source/js/', function callback (abspath, rootdir, subdir, filename) {
      if ( filename.match('.js') ) {
        grunt.file.copy( abspath, 'build/js/' + filename );
      }
    });
    /** load pages JSON Object*/ 
    var pages = grunt.file.readJSON(__dirname + '/source/json/pages.json');        
    try {
      /** iterate pages and transform in HTML*/
      _.each( pages , function ( element, index) {
        /** if callback is set, we need to load the JS module and call it */
        if ( ! _.isUndefined ( pages[index].callback )  ) {
          /** load JS module */
          var module = require( element.callback ) ;
          /** 
           * call module with parent configuration so that its possible 
           * to overwrite defaults. Our modules accept a Function callback
           * we pass "transform.html" as the default.
           * 
           */
          module[element.callback]( transform.dynamic, { parent_conf : conf } ) ;
        }
        else {
          /** all we need to construct this HTML page it's in the page Object */
          transform.html(__dirname + '/build' + pages[index].route, index);
        }
      });
    }
    catch ( err ) {
      grunt.log.write('Unknown error: ' + err.description).error();
    }
  });
  
  grunt.registerTask('default', ['clean', 'copy', 'curl', 'uglify', 'sass', 'isawLibraryBlog', 'writeHTML']);
   
};
