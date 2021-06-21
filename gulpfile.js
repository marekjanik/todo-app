const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const webpack = require("webpack");

sass.compiler = require("sass");

const server = function (cb) {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    notify: false,
    open: true,
  });

  cb();
};

const css = function () {
  return gulp
    .src("src/scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
};

const js = function (cb) {
  return webpack(require("./webpack.config.js"), function (err, stats) {
    if (err) throw err;
    console.log(stats);
    browserSync.reload();
    cb();
  });
};

const watch = function (cb) {
  gulp.watch("src/scss/**/*.scss", gulp.series(css));
  gulp.watch("src/js/**/*.js", gulp.series(js));
  gulp.watch("dist/**/*.html").on("change", browserSync.reload);
  cb();
};

exports.default = gulp.series(css, js, server, watch);
exports.css = css;
exports.watch = watch;
exports.js = js;
