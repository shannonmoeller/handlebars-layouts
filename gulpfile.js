'use strict';

var gulp = require('gulp'),
	pkg = require('./package.json'),
	paths = {
		dest: './dist',
		gulp: './gulpfile.js',
		src: './index.js',
		test: './test/*.{e2e,spec}.js'
	};

gulp.task('default', ['build']);

gulp.task('lint', function () {
	var jscs = require('gulp-jscs'),
		jshint = require('gulp-jshint');

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

gulp.task('test', ['lint', 'cover'], function () {
	var istanbul = require('gulp-istanbul'),
		mocha = require('gulp-mocha');

	return gulp
		.src(paths.test)
		.pipe(mocha({ reporter: 'spec' }))
		.pipe(istanbul.writeReports());
});

gulp.task('build', ['test'], function () {
	var browserify = require('browserify'),
		source = require('vinyl-source-stream'),
		options = { standalone: 'handlebars-layouts' };

	return browserify(paths.src, options)
		.bundle()
		.pipe(source(pkg.name + '.js'))
		.pipe(gulp.dest(paths.dest));
});
