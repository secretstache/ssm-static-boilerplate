'use strict';

import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import browser       from 'browser-sync';
import gulp          from 'gulp';
import panini        from 'panini';
import rimraf        from 'rimraf';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import named         from 'vinyl-named';

const TILEWIND_PATHS =  ['src/pages/**/*.html', 'src/{layouts,partials}/**/*.html', 'src/data/**/*.{js,json,yml}', 'src/helpers/**/*.js', 'src/assets/styles/**/*.css'];
const ASSETS_PATHS = [ 'src/assets/**/*', '!src/assets/{scripts,styles}{,/**/*}'];
const DIST = 'dist';
const PORT = '8000';
const ENTRIES = ['src/assets/scripts/app.js'];

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
    gulp.series(clean, gulp.parallel(pages, javascript, css, copy)));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', server, watch));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(DIST, done);
}

// Copy files out of the assets folder
function copy() {
  return gulp.src(ASSETS_PATHS)
    .pipe(gulp.dest(DIST + '/assets'));
}

// Copy page templates into finished HTML files
function pages() {
  return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      data: 'src/data/',
      helpers: 'src/helpers/'
    }))
    .pipe(gulp.dest(DIST));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
  panini.refresh();
  done();
}

let webpackConfig = {
  mode: (PRODUCTION ? 'production' : 'development'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ "@babel/preset-env" ],
            compact: false
          }
        }
      }
    ]
  },
  devtool: !PRODUCTION && 'source-map'
}

function css() {
  return gulp.src('src/assets/styles/app.css')
    .pipe($.sourcemaps.init())
    .pipe($.postcss())
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(DIST + '/assets/styles'))
    .pipe(browser.reload({ stream: true }));
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src(ENTRIES)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(webpackConfig, webpack2))
    .pipe($.if(PRODUCTION, $.terser()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(DIST + '/assets/js'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: DIST, port: PORT
  }, done);
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload();
  done();
}

function watch() {
    gulp.watch(ASSETS_PATHS, gulp.series(copy,browser.reload));
    gulp.watch(['src/pages/**/*.html', 'src/{layouts,partials}/**/*.html', 'src/data/**/*.{js,json,yml}', 'src/helpers/**/*.js']).on('all', gulp.series(resetPages, pages, browser.reload));
    gulp.watch(['tailwind.config.js', ...TILEWIND_PATHS]).on('all', css);
    gulp.watch('src/assets/scripts/**/*.js').on('all', gulp.series(javascript, browser.reload));
}