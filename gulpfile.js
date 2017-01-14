const gulp = require('gulp');
require('require-dir')('./gulp');

gulp.task('default', ['babel-compile'], (done) => {
  gulp.start('watch');
  done();
});

gulp.task('production', ['babel-compile', 'test'], (done) => {
  done();
});
