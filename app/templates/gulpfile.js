var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    nodemon = require('gulp-nodemon'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css'),
    livereload = require('gulp-livereload');
    jade = require('gulp-jade');

gulp.task('less', function() {
  gulp.src('public/src/less/style.less')
    .pipe(sourcemaps.init())
    .pipe(less({compress: true}).on('error', console.error.bind(console)))
    .pipe(autoprefixer())
    .pipe(minifyCss({keepBreaks: false}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/dist/styles'))
    .pipe(livereload());
});

gulp.task('jade', function() {
  gulp.src('public/src/jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('public/dist'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();

  gulp.watch('public/src/less/**/*.less', ['less']);
  gulp.watch('public/src/jade/*.jade', ['jade']);
});

gulp.task('develop', function() {
  nodemon({
    script: 'server.js'
  });
});

gulp.task('default', ['jade', 'less', 'watch', 'develop']);
