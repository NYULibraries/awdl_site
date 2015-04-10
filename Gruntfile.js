module.exports = function ( grunt ) {

  /** task to run */
  var tasks = ['clean', 'copy', 'uglify', 'sass', 'curl', 'isawLibraryBlog', 'writeHTML'] ;

  var configuration = require('./Gruntconfigurations');
  
  var taskConfiguration = {
    pkg: grunt.file.readJSON('package.json'),
	clean: configuration.clean(),
	copy: configuration.copy(),
	uglify: configuration.uglify(),
	sass: configuration.sass(),
	watch: configuration.watch()
  };

  if ( grunt.file.isFile( __dirname + '/source/json/curl.json' ) ) {
	taskConfiguration.curl = configuration.curl () ;
  }    

  /** project configuration */
  grunt.initConfig ( taskConfiguration );
  
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
  grunt.registerTask('isawLibraryBlog', 'isawLibraryBlog', function() {
        var done = this.async();
        var request = require('request');
        var fs = require('fs');        
        var xml2js = require('xml2js');
        var parser = new xml2js.Parser();        
        var dateFormat = require('dateformat');
        var src = "http://isaw.nyu.edu/library/blog/collector/RSS";
        var dest = __dirname + "/source/json/datasources/isawBlog.json";
        request( src, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            parser.parseString( body, function ( err, result ) {
              var blogTitle = result['rdf:RDF']['channel'][0].title[0];
              var blogLink = result['rdf:RDF']['channel'][0].link[0];                    
              var blogDescription = result['rdf:RDF']['channel'][0].description[0];
                    
              /** this widget only show the first item of the RSS feed */
              var items = result['rdf:RDF'].item.shift();
                    
              /**
               * See: https://jira.nyu.edu/browse/AWDL-144?focusedCommentId=53481&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-53481
               *  - FullMonthName DayOfMonth, FourDigitYear
               *  - No zero filling for the Day of Month. 
               */
              items.date = dateFormat( items['dc:date'][0], "mmmm dS, yyyy") ;
              items.title = items.title[0] ;                    
              items.link = items.link[0] ;                                        
              grunt.file.write ( dest , JSON.stringify ( { title : blogTitle , link : blogLink , description : blogDescription , items : [ items ] } ) ) ;
              done();
            });
          }
        });
  });
  
  grunt.registerTask('default', tasks) ;
  
};
