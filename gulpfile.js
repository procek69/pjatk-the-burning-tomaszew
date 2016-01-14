/**
  * ===============
  * devDependencies
  * ===============
 */
var gulp      = require('gulp'),
    compass   = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),
    connect   = require('gulp-connect'),
    concat    = require('gulp-concat');

/**
  * =============
  * env constants
  * =============
 */
var
    /**
      * server settings
     */
    LISTEN_LAN_CLIENTS = true,
    SERVER_PORT        = '8000',
    DIRECTORY_LISTING  = true,

    /**
      * directories
     */
    ROOT_SITE_FOLDER   = './public',
    ROOT_CSS           = [ROOT_SITE_FOLDER, 'css'].join('/'),
    ROOT_SASS          = [ROOT_SITE_FOLDER, 'sass'].join('/'),
    ROOT_IMAGE         = [ROOT_SITE_FOLDER, 'image'].join('/'),
    ROOT_TEMP          = [ROOT_SITE_FOLDER, 'temp'].join('/'),
    ROOT_ROCKET_JS     = [ROOT_SITE_FOLDER, 'app'].join('/'),
    ROOT_JS            = [ROOT_SITE_FOLDER, 'js'].join('/'),

    /**
      * expression pointers to files
     */
    HTML_FILES         = [ROOT_SITE_FOLDER, '**/*.html'].join('/'),
    ROCKET_JS_FILES    = [ROOT_ROCKET_JS, '**/*.js'].join('/'),
    SASS_FILES         = [ROOT_SASS, '**/*.scss'].join('/'),
    EVERYTHING         = [ [ROOT_SITE_FOLDER, '**/*.js'].join('/'),
                           HTML_FILES,
                           [ROOT_SITE_FOLDER, '**/*.css'].join('/') ];


/**
  * =======================
  * commands - gulp methods
  * =======================
 */

gulp.task('compass', function () {
  gulp.src([ROOT_SASS, '**/*.scss'].join('/'))
    .pipe(compass({
      css   : ROOT_CSS,
      sass  : ROOT_SASS,
      image : ROOT_IMAGE
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(ROOT_TEMP))
    .pipe(connect.reload());
});

gulp.task('compass-watch', function() {
  gulp.watch(SASS_FILES, ['compass']);
});

gulp.task('rocket.js', function() {
  gulp.src(ROCKET_JS_FILES)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(ROOT_JS));
});

gulp.task('rocket.js-watch', function () {
  gulp.watch(ROCKET_JS_FILES, ['rocket.js', 'reload']);
});

gulp.task('reload', function () {
  gulp.src(HTML_FILES)
    .pipe(connect.reload());
});

gulp.task('html-watch', function () {
  gulp.watch(HTML_FILES, ['reload']);
});

gulp.task('webserver', function() {

  connect.server({
    root: ROOT_SITE_FOLDER,
    livereload: true,
    host : LISTEN_LAN_CLIENTS ? '0.0.0.0' : '127.0.0.1',
    port : SERVER_PORT,
    directoryListing : DIRECTORY_LISTING
  });

});


gulp.task('default', ['webserver', 'html-watch', 'compass-watch']);
gulp.task('rocket', ['webserver', 'html-watch', 'compass-watch', 'rocket.js-watch']);
