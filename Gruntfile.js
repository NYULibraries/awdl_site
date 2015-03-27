/* jshint laxcomma: true */
module.exports = function(grunt) {

    var _ = require('underscore');
    
    var pkg = grunt.file.readJSON('package.json');
    
    function transformHTML(buildPath, task) {

        try {

            var hogan = require('hogan'),
                conf = grunt.file.readJSON(__dirname + '/source/json/conf.json'),
                pages = grunt.file.readJSON(__dirname + '/source/json/pages.json'),
                widgets = grunt.file.readJSON(__dirname + '/source/json/widgets.json'),
                uncompileTemplate = grunt.file.read(__dirname + '/source/views/' + task + '.mustache'),
                source = pages[task],
                matchWidgetsRegEx = "data-script='(.*)'",
                matchWidgets = uncompileTemplate.match(matchWidgetsRegEx),
                javascriptTagOpen = '<script>',
                javascriptTagClose = '</script>',
                template = hogan.compile(uncompileTemplate),
                environment = conf.environment,
                partials = {},
                menus = [],
                navbar = [],
                toJSON = '',
                javascriptString = '',
                handlebarsTemplate = '',
                links = '',
                closure = '';


            if ( matchWidgets && matchWidgets[0] ) {

                toJSON = matchWidgets[0];

                toJSON = toJSON.replace(/'/g, '').replace(/data-script=/g, '');

                toJSON = JSON.parse(toJSON);

                _.each(toJSON.js, function(js) {
                    if (grunt.file.isFile('build/js/' + js)) {
                        javascriptString += javascriptTagOpen + grunt.file.read('build/js/' + js) + javascriptTagClose;
                    }
                });

                _.each(toJSON.hbs, function(hbs) {
                    var handlebarsTagOpen = '<script id="' + hbs.id + '" type="text/x-handlebars-template">',
                        handlebarsTagClose = '</script>';

                    if (grunt.file.isFile('source/views/' + hbs.template)) {
                        handlebarsTemplate += handlebarsTagOpen + grunt.file.read('source/views/' + hbs.template) + handlebarsTagClose;
                    }
                });
            }

            closure += handlebarsTemplate + javascriptString;

            source.closure = closure;

            // build the menu object
            _.each(pages, function(page, index) {
                if (_.isArray(pages[index].menu)) {
                    _.each(pages[index].menu, function(menu) {
                        menus[menu.weight] = {
                            label: menu.label,
                            status: 'active',
                            route: pages[index].route.replace('/index.html', ''),
                            page: index,
                            weight: menu.weight
                        };
                    });
                }
            });

            // this spaghetti maps the widgets to the taks and 
            // load data Object if type is not local
            if ( source.content ) {
              _.each( source.content, function ( content, a ) {
                _.each( source.content[a], function ( pane, b ) {
                  if ( _.isArray( source.content[a][b].widgets ) ) {
                    source.content[a][b].raw = []
                    _.each( source.content[a][b].widgets, function ( widget, c ) {
                      var spaghetti = {};
                      if ( widgets[source.content[a][b].widgets[c]].sourceType === 'json' ) {
                        spaghetti =  { 
                          label : widget, 
                          widget : widgets[source.content[a][b].widgets[c]] , 
                          data : grunt.file.readJSON( __dirname + '/' + widgets[source.content[a][b].widgets[c]].source ) 
                        } ;   
                      }
                      // if you care about placement in specific scenario
                      source.content[a][b][widget] = spaghetti;
                      // as array to loop by weight
                      source.content[a][b].raw.push( spaghetti );
                      
                      if ( task === 'front' ) console.log ( spaghetti )
                      
                    });
                  }
                });
              });
            }
            
            source.menus = menus;
            
            source.appRoot = conf[environment].appRoot;
            
            source.discoUrl = conf[environment].discoUrl;
            
            source.discovery = conf.discovery;
            
            source.appName = conf.appName;
            
            source.appUrl = conf[environment].appUrl;
            
            source.partners = widgets.partners;

            if ( conf[environment].sass.build === 'external' ) {
                source.css = "<link href='" + source.appUrl + "/css/style.css' rel='stylesheet' type='text/css'>";
            }
            else {
                source.css = "<style>" + grunt.file.read(__dirname + '/build/css/style.css') + "</style>";
            }

            grunt.file.recurse(__dirname + '/source/views/', function callback(abspath, rootdir, subdir, filename) {
                if (filename.match(".mustache") && task + '.mustache' !== filename) {
                    var name = filename.replace(".mustache", ""),
                        partial = grunt.file.read(abspath),
                        matchWidgetsRegEx = "data-script='(.*)'",
                        matchWidgets = partial.match(matchWidgetsRegEx),
                        toJSON = '',
                        javascriptString = '',
                        javascriptTagOpen = '<script>',
                        javascriptTagClose = '</script>',
                        closure = '';

                    if (!_.find(_.keys(pages), name)) {
                        if (matchWidgets && matchWidgets[0]) {
                            toJSON = matchWidgets[0];
                            toJSON = toJSON.replace(/'/g, '').replace(/data-script=/g, '');
                            toJSON = JSON.parse(toJSON);
                            _.each(toJSON.js, function(js) {
                                if (grunt.file.isFile('build/js/' + js)) {
                                    javascriptString += javascriptTagOpen + grunt.file.read('build/js/' + js) + javascriptTagClose;
                                }
                            });
                        }
                        partials[name] = partial + javascriptString;
                    }
                }
            });

            grunt.file.recurse(__dirname + '/source/views/', function callback(abspath, rootdir, subdir, filename) {
                if (filename.match(".hbs")) {
                    grunt.file.write('build/js/' + filename, grunt.file.read(abspath));
                }
            });

            // write file
            grunt.file.write(buildPath, template.render(source, partials));

            grunt.log.write('Transforming ' + task + ' template into HTML ').ok();

        } catch (err) {

            grunt.log.write('Transforming template into HTML. See ' + err.description + ' ').error();

            console.log(err);
        }


    }

    function curlConfiguration() {
        var conf = grunt.file.readJSON(__dirname + '/source/json/conf.json');
        return conf[conf.environment].curl;
    }

    function sassConfiguration() {
        var conf = grunt.file.readJSON(__dirname + '/source/json/conf.json');
        return {
            dist: {
                options: conf[conf.environment].sass.options,
                files: {
                    'build/css/style.css': __dirname + '/source/sass/style.scss'
                }
            }
        }
    }

    function copyConfiguration() {
        return {
            main: {
                expand: true,
                cwd: 'source/images',
                src: '**/*',
                dest: 'build/images',
            }
        };
    }

    function cleanConfiguration() {
        return [, __dirname + '/build/images', , __dirname + '/build/css'];
    }

    function watchConfiguration() {
        return {
            files: [
                __dirname + '/source/js/*.js', __dirname + '/source/json/*.json', __dirname + '/source/sass/*.scss', __dirname + '/source/views/*.mustache'
            ],
            tasks: [
                'clean', 'copy', 'uglify', 'sass', 'writeHTML'
            ]
        };
    }

    function uglifyConfiguration() {
        function targetsCallback() {
            var targets = {};
            grunt.file.recurse(__dirname + '/source/js/', function callback(abspath, rootdir, subdir, filename) {
                var name;
                if (filename.match('.js')) {
                    name = filename.replace('.js', '');
                    targets['build/js/' + name + '.min.js'] = abspath;
                }
            });
            return targets;
        }
        return {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                compress: true,
                preserveComments: false
            },
            my_target: {
                files: targetsCallback()
            }
        };
    }
    
    /** project configuration */
    grunt.initConfig({
        pkg: pkg,
        curl: curlConfiguration(),
        clean: cleanConfiguration(),
        copy: copyConfiguration(),
        uglify: uglifyConfiguration(),
        sass: sassConfiguration(),
        watch: watchConfiguration()
    });

    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // ideally this will be a sub-module    
    /** this task reads the RSS feed from ISAW Library Blog that was copy by */
    grunt.registerTask('isawLibraryBlog', 'isawLibraryBlog', function() {
        var done = this.async();
        var request = require('request');
        var fs = require('fs');        
        var xml2js = require('xml2js');
        var parser = new xml2js.Parser();        
        var src = "http://isaw.nyu.edu/library/blog/collector/RSS";
        var dest = __dirname + "/source/json/datasources/isawBlog.json";
        request( src, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                parser.parseString( body, function ( err, result ) {
                    var blogTitle = result['rdf:RDF']['channel'][0].title[0];
                    var blogLink = result['rdf:RDF']['channel'][0].link[0];                    
                    var blogDescription = result['rdf:RDF']['channel'][0].description[0];
                    /** this widget only show the first item of the RSS feed */
                    var items = result['rdf:RDF'].item.shift(); // This returns an object
                 
                    // grunt.log.write("isArray: " + _.isArray(items)); // It's not an array
                    // grunt.log.write("isObject: " + _.isObject(items));
                    // The value of each is here considered an object -- we need to look for empty strings within in
                    items = _.omit(items, function(value, key, object) { return (_.isEmpty(value[0]));});
                    // Log cleaned up object
                    for( var x in items)
                                 grunt.log.write("\n 2  -- "+ x + " : " +  items[x]); 
                 
                    var feed = { title : blogTitle , link : blogLink , description : blogDescription , items : [ items ] } ;
                    grunt.file.write( dest , JSON.stringify( feed ) );
                    done();
                });
            }
        });
    });

    grunt.registerTask('writeHTML', 'writeHTML', function() {
        var pages = grunt.file.readJSON(__dirname + '/source/json/pages.json');
        try {
            _.each(pages, function(element, index) {
                transformHTML(__dirname + '/build' + pages[index].route, index);
            });
        }
        catch (err) {
            grunt.log.write("Unknown error: " + err.description).error();
        }
    });

    grunt.registerTask('default', ['clean', 'copy', 'curl', 'uglify', 'sass', 'isawLibraryBlog', 'writeHTML']);

};