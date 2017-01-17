var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('integrationTests', () => {
    return gulp.src('index.js')
        .pipe(shell('npm test'))
});
