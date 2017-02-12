'use strict';

var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
    browserify({
        entries: './scripts/main.js',
        debug: true
    })
    .transform(babelify.configure({
        presets: ['es2015']
    }))
    .bundle()
    .pipe(source('app.bundle.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy', function () {
    gulp.src('index.html')
    .pipe(gulp.dest('./dist'));
    gulp.src('css/style.css')
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
    gulp.watch('scripts/*.js', ['build']);
    gulp.watch('*.html', ['copy']);
    gulp.watch('css/*.css', ['copy']);
});

gulp.task('default', ['copy', 'build', 'watch']);
