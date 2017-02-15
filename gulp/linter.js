const gulp = require('gulp');
const shell = require('gulp-shell');


gulp.task('lint', () => {
  return gulp.src(['src', 'test'])
    .pipe(shell('npm run lint'));
});
