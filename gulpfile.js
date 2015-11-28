var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var copy = require('gulp-copy');
var webserver = require('gulp-webserver');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

var b = browserify({
  entries: ['src/index.jsx'],
  extensions: ['.jsx', '.js'],
  debug: true,
  cache: {},
  packageCache: {},
  plugin: [watchify]
});

b.transform(babelify);

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('index.js'))
    .pipe(gulp.dest('build'));
}

gulp.task('babel', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(copy('build', {
      prefix: 1
    }));
});

gulp.task('watch', function() {
  gulp.watch('src/index.html', ['copy']);
});

gulp.task('server', function() {
  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      fallback: 'index.html',
      open: true
    }));
});

gulp.task('build:test', function() {
  return browserify('src/test/index.js', {extensions: ['.jsx', 'js'], debug: true})
    .transform(babelify)
    .bundle()
    .on('error', function(error) {
      console.log(error.message);
    })
    .pipe(source('test.js'))
    .pipe(gulp.dest('src/test'));
});

gulp.task('test', ['build:test'], function () {
  gulp.src('src/test/runner.html')
  .pipe(mochaPhantomJS({
    reporter: 'spec'
  }));
});

gulp.task('default', ['copy', 'babel', 'watch', 'server']);
