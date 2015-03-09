var SOURCE_PATH = './src/',
    DIST_PATH = './public/',

    gulp = require('gulp'),
    _ = require('lodash'),
    fs = require('fs'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    path = require('path'),
    nodemon = require('gulp-nodemon'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css'),
    livereload = require('gulp-livereload');
    data = require('gulp-data');
    jade = require('gulp-jade');

gulp.task('less', function() {
  gulp.src(SOURCE_PATH + 'less/style.less')
    .pipe(sourcemaps.init())
    .pipe(less({compress: true}).on('error', console.error.bind(console)))
    .pipe(autoprefixer())
    .pipe(minifyCss({keepBreaks: false}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH + 'styles'))
    .pipe(livereload());
});

gulp.task('jade', function() {
  var globals = JSON.parse(fs.readFileSync(SOURCE_PATH + 'data/globals.json', 'utf8'));
  gulp.src(SOURCE_PATH + 'jade/*.jade')
    .pipe(data(function(file) {
      // Try to load data from coresponding JSON file for every
      // processed page and merge them with static globals
      var filename = path.basename(file.path, '.jade'),
          dataSrc = SOURCE_PATH + 'data/' + filename + '.json',
          json;
      try {
        json = JSON.parse(fs.readFileSync(dataSrc, 'utf8'));
      } catch (e) {
        json = {};
      }
      var data = _.assign({}, globals, json);
      console.log(data);
      return data;
    }))
    .pipe(jade({
      pretty: true
    }).on('error', console.error.bind(console)))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();

  gulp.watch(SOURCE_PATH + 'less/**/*.less', ['less']);
  gulp.watch(SOURCE_PATH + 'jade/**/*.jade', ['jade']);
  gulp.watch(SOURCE_PATH + 'data/*.json', ['jade']);
});

gulp.task('develop', function() {
  nodemon({
    script: 'server.js'
  });
});

gulp.task('default', ['jade', 'less', 'watch', 'develop']);
