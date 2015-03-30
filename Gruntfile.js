module.exports = function ( grunt ) {

  var _ = require('underscore');

  var pkg = grunt.file.readJSON('package.json');

  //var transform = require('transform');

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
  grunt.loadNpmTasks('grunt-contrib-writeHTML');
    
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

  // grunt.registerTask('default', ['clean', 'copy', 'curl', 'uglify', 'sass', 'isawLibraryBlog', 'writeHTML']);
  
  grunt.registerTask('default', ['clean', 'copy', 'curl', 'uglify', 'sass', 'writeHTML']);
   
};
