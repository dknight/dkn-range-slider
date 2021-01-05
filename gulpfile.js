const gulp = require('gulp');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const replace = require('gulp-string-replace');
const fs = require('fs');
const del = require('del');
const pkgjson = require('./package.json');

const SLIDER_SRC_JS_PATH = 'src/dkn-range-slider.js';
const SLIDER_INJECTED_STYLE_PATH = 'src/css/style.css';
const SLIDER_INJECTED_MIN_STYLE_PATH = './style.min.css';
const SLIDER_THEMES_PATH = 'src/themes/*.css';
const SLIDER_THEMES_DIST_PATH = 'dist/themes';

const replaceOpts = {
  logs: {
    enabled: false
  }
};

const css = () => {
  return gulp.src(SLIDER_THEMES_PATH)
      .pipe(cleanCss())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(SLIDER_THEMES_DIST_PATH));
};

const createInjectedCss = () => {
  return gulp.src(SLIDER_INJECTED_STYLE_PATH)
      .pipe(cleanCss())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('.'));
};

const getInjectedCss = () => {
  return fs.readFileSync(SLIDER_INJECTED_MIN_STYLE_PATH, 'utf8');
};

const combineAllThemes = () => {
  return gulp.src(SLIDER_THEMES_PATH)
      .pipe(cleanCss())
      .pipe(concat('all-themes.css'))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(SLIDER_THEMES_DIST_PATH));
};

const distSource = () => {
  return gulp.src(SLIDER_SRC_JS_PATH)
      .pipe(replace('{{CSS}}', getInjectedCss()), replaceOpts)
      .pipe(replace('{{VERSION}}', pkgjson.version))
      .pipe(replace('{{REPO}}', pkgjson.repository.url))
      .pipe(replace('{{LICENSE}}', pkgjson.license))
      .pipe(gulp.dest('./dist'));
};

const minJs = () => {
  return gulp.src(SLIDER_SRC_JS_PATH)
      .pipe(sourcemaps.init())
      .pipe(terser({}))
      .pipe(replace('{{CSS}}', getInjectedCss()), replaceOpts)
      .pipe(replace('{{VERSION}}', pkgjson.version))
      .pipe(replace('{{REPO}}', pkgjson.repository.url))
      .pipe(replace('{{LICENSE}}', pkgjson.license))
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist'));
}

const clean = () => {
  return del([SLIDER_INJECTED_MIN_STYLE_PATH]);
};

exports.default = gulp.series(css, combineAllThemes,
  createInjectedCss, minJs, distSource, clean);
