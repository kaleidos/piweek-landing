/*global require*/
"use strict";

const gulp = require('gulp'),
      path = require('path'),
      pug = require('gulp-pug'),
      prefix = require('gulp-autoprefixer'),
      sass = require('gulp-sass')(require('sass')),
      browserSync = require('browser-sync');

/*
 * Directories here
 */
const paths = {
  dist: './dist/',
  sass: './src/sass/',
  css: './dist/css/',
  images: './dist/images/',
  jsfiles: './dist/js/',
};

/**
 * Compile .pug files
 */
function buildHtml () {
  return gulp.src('./src/*.pug')
    .pipe(pug())
    .on('error', (err) => {
      console.log(err.message);
    })
    .pipe(gulp.dest(paths.dist));
}

/**
 * Compile .scss files into dist css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
function buildCss () {
  return gulp.src(paths.sass + '*.scss')
    .pipe(sass({
      includePaths: [paths.sass],
      outputStyle: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(prefix(['last 15 versions', '> 1%'], {
      cascade: true
    }))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
      stream: true
    }));
}

/** Copy images to dist **/
function copyImages() {
  return gulp.src('./src/images/**/*.{jpg,gif,png,svg}')
    .pipe(gulp.dest(paths.images));
}

/** Copy js to dist **/
function copyJs() {
  return gulp.src('./src/js/**/*')
    .pipe(gulp.dest(paths.jsfiles));
}


/** Start browser-sync Server **/
function browserSyncServer(cb) {
  gulp.parallel(buildCss, buildHtml, copyImages, copyJs);
  browserSync({
    server: {
      baseDir: paths.dist
    },
    notify: false
  });
  cb();
}

/** Reload browser-sync **/
function browserSyncReload(cb){
  browserSync.reload();
  cb();
}

/**
 * Watch .scss files for changes & recompile
 * Watch .pug files for changes & recompile
 */
function watch () {
  gulp.watch(
    paths.sass + '**/*.scss',
    gulp.series(buildCss, browserSyncReload)
  );
  gulp.watch(
    './src/**/*.pug',
    gulp.series(buildHtml, browserSyncReload)
  );
}


// Build task compile sass and pug and copy images and css.
const build = gulp.parallel(
  buildCss,
  buildHtml,
  copyImages,
  copyJs
);

// Serve (for developers)
const serve = gulp.series(
  build,
  browserSyncServer,
  watch
);


exports.build = build;
exports.default = serve;
