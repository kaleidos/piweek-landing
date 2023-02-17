/*global require*/
"use strict";

var gulp = require('gulp'),
  path = require('path'),
  data = require('gulp-data'),
  pug = require('gulp-pug'),
  prefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync');

/*
 * Directories here
 */
var paths = {
  dist: './dist/',
  sass: './src/sass/',
  css: './dist/css/',
  images: './dist/images/',
  jsfiles: './dist/js/',
};

/**
 * Compile .pug files
 */
gulp.task('pug', function () {
  return gulp.src('./src/*.pug')
    .pipe(pug())
    .on('error', (err) => {
      console.log(err.message);
    })
    .pipe(gulp.dest(paths.dist));
});

/**
 * Recompile .pug files and live reload the browser
 */
gulp.task('rebuild', ['pug'], function () {
  browserSync.reload();
});

/**
 * Wait for pug and sass tasks, then launch the browser-sync Server
 */
gulp.task('browser-sync', ['sass', 'pug'], function () {
  browserSync({
    server: {
      baseDir: paths.dist
    },
    notify: false
  });
});

/**
 * Compile .scss files into dist css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('sass', function () {
  return gulp.src(paths.sass + '*.scss')
    .pipe(sass({
      includePaths: [paths.sass],
      outputStyle: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
      cascade: true
    }))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

/** Copy images to dist **/
gulp.task('copyimages', function() {
   gulp.src('./src/images/**/*.{jpg,gif,png,svg}')
   .pipe(gulp.dest(paths.images));
});

/** Copy js to dist **/
gulp.task('copyjs', function() {
   gulp.src('./src/js/**/*')
   .pipe(gulp.dest(paths.jsfiles));
});

/**
 * Watch scss files for changes & recompile
 * Watch .pug files run pug-rebuild then reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(paths.sass + '**/*.scss', ['sass']);
  gulp.watch('./src/**/*.pug', ['rebuild']);
});

// Build task compile sass and pug.
gulp.task('build', ['sass', 'pug', 'copyimages', 'copyjs']);

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['browser-sync', 'watch']);
