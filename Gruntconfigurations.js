
var grunt = require('grunt') ;

var conf = grunt.file.readJSON(__dirname + '/source/json/conf.json');

function curl () {
  return conf[conf.environment].curl;
}

function sass () {
  return {
    dist: {
      options: conf[conf.environment].sass.options,
      files: {
        'build/css/style.css': __dirname + '/source/sass/style.scss'
      }
    }
  };
}

function copy () {
  return {
    main: {
      expand: true,
      cwd: 'source/images',
      src: '**/*',
      dest: 'build/images',
    }
  };
}

function clean () {
  return [ 
    __dirname + '/build/*',
    __dirname + '/source/json/datasources/*.json' 
  ];
}

function watch () {
  return {
    files: [
      __dirname + '/source/js/*.js',
      __dirname + '/source/json/*.json',
      __dirname + '/source/sass/*.scss',
      __dirname + '/source/views/*.mustache',
      __dirname + '/source/views/*.hbs'
    ],
    tasks: [
      'clean',
      'copy',
      'uglify',
      'sass',
      'writeHTML'
    ]
  };
}

function uglify () {
  function targetsCallback() {
    var targets = {};
    grunt.file.recurse(__dirname + '/source/js/', function callback (abspath, rootdir, subdir, filename) {
      if ( filename.match('.js') ) {
        var name = filename.replace('.js', '');
        targets['build/js/' + name + '.min.js'] = abspath;
      }
    });
    return targets;
  }
  return {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      compress: {}, // https://github.com/gruntjs/grunt-contrib-uglify/issues/298#issuecomment-74161370
      preserveComments: false
    },
    my_target: {
      files: targetsCallback()
    }
  };
}

exports.curl = curl;
exports.sass = sass;
exports.copy = copy;
exports.clean = clean;
exports.watch = watch;
exports.uglify = uglify;
