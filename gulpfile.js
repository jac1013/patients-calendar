const gulp = require('gulp');
require('require-dir')('./gulp');

gulp.task('default', ['babel-compile', 'lint'], (done) => {
  gulp.start('watch');
  done();
});

gulp.task('production', ['babel-compile', 'test', 'lint'], (done) => {
  done();
});
