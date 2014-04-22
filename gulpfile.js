'use strict';

var gulp = require('gulp');
var pkg = require('./package.json');

var paths = {
    dest: './dist',
    gulp: './gulpfile.js',
    src: './index.js',
    test: './test/**/*Spec.js'
};

gulp.task('default', ['build']);

gulp.task('lint', function () {
    var jscs = require('gulp-jscs');
    var jshint = require('gulp-jshint');

    return gulp
        .src([paths.gulp, paths.src, paths.test])
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('cover', function () {
    var istanbul = require('gulp-istanbul');

    return gulp
        .src(paths.src)
        .pipe(istanbul());
});

gulp.task('test', ['cover'], function () {
    var istanbul = require('gulp-istanbul');
    var jasmine = require('gulp-jasmine');

    return gulp
        .src(paths.test)
        .pipe(jasmine({ verbose: true }))
        .pipe(istanbul.writeReports());
});

gulp.task('build', ['lint', 'test'], function () {
    var browserify = require('browserify');
    var source = require('vinyl-source-stream');

    return browserify(paths.src)
        .bundle()
        .pipe(source(pkg.name + '.js'))
        .pipe(gulp.dest(paths.dest));
});
