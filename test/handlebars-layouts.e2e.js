'use strict';

var handlebars,
	handlebarsLayouts,
	expect = require('expect'),
	fs = require('fs'),
	through = require('through2'),
	vinylFs = require('vinyl-fs'),

	config = {
		partials: __dirname + '/fixtures/partials/',
		fixtures: __dirname + '/fixtures/templates/',
		expected: __dirname + '/expected/templates/',
		actual: __dirname + '/actual/templates/'
	};

describe('handlebars-layouts e2e', function () {
	function read(filepath) {
		return fs.readFileSync(filepath, 'utf8');
	}

	function testWithFile(filename, data, done) {
		var fixture = config.fixtures + filename,
			expected = config.expected + filename;

		function compileFile(file, enc, cb) {
			try {
				var template = handlebars.compile(String(file.contents));
				file.contents = new Buffer(template(data));
				cb(null, file);
			}
			catch (err) {
				cb(err);
			}
		}

		function expectFile(file) {
			expect(String(file.contents)).toBe(read(expected));
			done();
		}

		function expectError(err) {
			expect(err.message).toContain('derp');
			done();
		}

		vinylFs
			.src(fixture)
			.pipe(through.obj(compileFile))
			// .pipe(vinylFs.dest(config.actual))
			.on('data', expectFile)
			.on('error', expectError);
	}

	beforeEach(function () {
		// Delete
		delete require.cache[require.resolve('handlebars')];
		delete require.cache[require.resolve('../index')];

		// Reload
		handlebars = require('handlebars');
		handlebarsLayouts = require('../index');

		// Register helpers
		handlebars.registerHelper(handlebarsLayouts(handlebars));

		// Register partials
		handlebars.registerPartial({
			'deep-a':   read(config.partials + '/deep-a.hbs'),
			'deep-b':   read(config.partials + '/deep-b.hbs'),
			'deep-c':   read(config.partials + '/deep-c.hbs'),
			layout:     read(config.partials + '/layout.hbs'),
			layout2col: read(config.partials + '/layout2col.hbs'),
			media:      read(config.partials + '/media.hbs'),
			user:       read(config.partials + '/user.hbs')
		});
	});

	it('should extend layouts', function (done) {
		var data = require('./fixtures/data/users.json');

		testWithFile('extend.html', data, done);
	});

	it('should deeply extend layouts', function (done) {
		testWithFile('deep-extend.html', {}, done);
	});

	it('should embed layouts', function (done) {
		var data = require('./fixtures/data/users.json');

		testWithFile('embed.html', data, done);
	});

	it('should append content', function (done) {
		testWithFile('append.html', { title: 'append' }, done);
	});

	it('should prepend content', function (done) {
		testWithFile('prepend.html', { title: 'prepend' }, done);
	});

	it('should replace content', function (done) {
		testWithFile('replace.html', { title: 'replace' }, done);
	});

	it('should ignore bogus content', function (done) {
		testWithFile('bogus.html', { title: 'bogus' }, done);
	});

	it('should pass through hash values', function (done) {
		var data = require('./fixtures/data/users.json');

		testWithFile('hash.html', data, done);
	});

	it('should throw an error if partial is not registered', function (done) {
		testWithFile('error.html', {}, done);
	});
});
