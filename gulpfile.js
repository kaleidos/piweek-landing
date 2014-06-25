var gulp = require('gulp'),
    newer = require('gulp-newer'),
    jade = require('gulp-jade'),

    scsslint = require('gulp-scss-lint'),
    sass = require('gulp-ruby-sass'),
    csslint = require('gulp-csslint'),
    minifyCSS = require('gulp-minify-css'),
    styledocco = require('gulp-styledocco'),

    concat = require('gulp-concat'),

    imagemin = require('gulp-imagemin'),

    watch = require('gulp-watch'),
    size = require('gulp-filesize'),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber'),
    cache = require("gulp-cached"),
    connect = require('gulp-connect'),
    merge = require('merge-stream');

/**************************************
    REQUIRED PATHS
**************************************/

var paths = {
    app: 'app',
    dist: 'dist',
    jade: 'app/**/*.jade',
    jadeViews: 'app/views/**/*.jade',
    appStyles: 'app/styles/**/*.scss',
    distStyles: 'dist/styles',
    sassMain: 'app/styles/main.scss',
    css:  'dist/styles/**/*.css',
    images: 'app/images/**/*',
    appScripts: 'app/scripts/**/*.js',
    distScripts: 'dist/scripts',
    jsLibs: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/injectorJS/src/injector.js'],
    scripts: [
        'app/scripts/main.js',
        'app/scripts/modules/*.js',
        'app/scripts/init.js']
};

/**************************************
    HTML TASKS
**************************************/

gulp.task("jade", function() {
  return gulp.src(paths.jade)
             .pipe(plumber())
             .pipe(jade({pretty: true}))
             .pipe(gulp.dest(paths.dist));
});

/**************************************
    CSS TASKS
**************************************/

// Sass lint
gulp.task("scss-lint", function() {
    gulp.src([paths.appStyles, "!/**/bourbon/**/*.scss", "!/**/normalize.css/**/normalize.css"])
        .pipe(plumber())
        .pipe(cache("scsslint"))
        .pipe(scsslint({config: "scss-lint.yml"}));
});

// Sass Files
gulp.task("sass", function () {
    return gulp.src(paths.sassMain)
    .pipe(sass())
    .pipe(gulp.dest(paths.distStyles));
});

// CSS Linting and report
gulp.task("cssLint", function() {
    gulp.src([paths.css, '!dist/styles/normalize.css'])
        .pipe(csslint("csslintrc.json"))
        .pipe(csslint.reporter());
});

// Minify CSS
gulp.task("minifyCSS", ["cssLint"], function () {
    gulp.src("dist/styles/main.css")
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.distStyles))
        .pipe(size());
});

/************************************
JS TASKS
**************************************/

gulp.task("jsLibs", function () {
    return gulp.src(paths.jsLibs)
    .pipe(plumber())
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(paths.distScripts));
});

gulp.task("scripts", function () {
    return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(concat('script.js'))
    .pipe(gulp.dest(paths.distScripts));
});


/**************************************
    IMAGE TASKS
**************************************/

gulp.task("imagemin", function () {
    return gulp.src(paths.images)
    .pipe(plumber())
    .pipe(imagemin({progressive: true}))
    .pipe(gulp.dest(paths.dist+"/images"));
});

/**************************************
    COPY TASKS
**************************************/

// Copy Files
gulp.task("copy", function() {
    // Copy fonts
    t1 = gulp.src(paths.app+"/fonts/*")
        .pipe(gulp.dest(paths.dist+"/fonts/"));

    t2 = gulp.src(paths.app+"/images/*")
        .pipe(gulp.dest(paths.dist+"/images/"));

    t3 = gulp.src(paths.app+"/video/*")
        .pipe(gulp.dest(paths.dist+"/video/"));

    t4 = gulp.src("bower_components/normalize.css/normalize.css")
        .pipe(gulp.dest(paths.dist+"/styles/"));
    return merge(t1, t2, t3, t4);
});

/**************************************
    SERVER TASKS
**************************************/

gulp.task('connect', function() {
    connect.server({
        root: paths.dist,
        livereload: true
    });
});

// Rerun the task when a file changes
gulp.task("watch", function() {
    gulp.watch(paths.jade, ["jade"]);
    gulp.watch(paths.appStyles, ["scss-lint", "sass", "cssLint"]);
    gulp.watch(paths.appScripts, ["scripts"]);
});

// The default task (called when you run `gulp` from cli)
gulp.task("default", [
    "jade",
    "sass",
    "cssLint",
    "jsLibs",
    "scripts",
    "copy",
    "connect",
    "watch"
]);

// The default task (called when you run `gulp` from cli)
gulp.task("dist", [
    "jade",
    "sass",
    "cssLint",
    "minifyCSS",
    "jsLibs",
    "scripts",
    "imagemin",
    "copy",
    "connect",
    "watch"
]);
