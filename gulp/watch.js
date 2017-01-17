const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify');
const livereload = require('gulp-livereload');

gulp.task('watch', () => {
  livereload.listen();
  nodemon({
    script: 'index.js',
    ext: 'js'
  }).on('restart', () =>{
    gulp.start('babel-compile')
      .src('app.js')
      .pipe(livereload())
      .pipe(notify('Reloading page, please wait...'));
  });
});
