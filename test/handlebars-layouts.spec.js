'use strict';

var handlebarsLayouts = require('../index'),
	expect = require('expect.js');

describe('handlebars-layouts spec', function () {
	var count, hbs, helpers;

	beforeEach(function () {
		count = 0;

		hbs = {
			partials: {
				foo: function (data) {
					count++;

					return (data && data.foo) || '';
				}
			},
			registerHelper: function (h) {
				count++;

				expect(h.extend).to.be.a(Function);
				expect(h.embed).to.be.a(Function);
				expect(h.block).to.be.a(Function);
				expect(h.content).to.be.a(Function);

				helpers = h;
			}
		};
	});

	it('should register helpers', function () {
		handlebarsLayouts(hbs);

		expect(count).to.be(1);
	});

	describe('register', function () {
		it('should register helpers', function () {
			handlebarsLayouts.register(hbs);

			expect(count).to.be(1);
		});
	});

	describe('#extend', function () {
		it('should use fallback values as needed', function () {
			handlebarsLayouts(hbs);

			expect(helpers.extend.call(null, 'foo')).to.be('');
			expect(helpers.extend.call({ foo: 'bar' }, 'foo')).to.be('bar');

			expect(count).to.be(3);
		});
	});

	describe('#embed', function () {
		it('should use fallback values as needed', function () {
			handlebarsLayouts(hbs);

			expect(helpers.embed.call(null, 'foo')).to.be('');
			expect(helpers.embed.call({ foo: 'bar' }, 'foo')).to.be('bar');

			expect(count).to.be(3);
		});
	});

	describe('#block', function () {
		it('should use fallback values as needed', function () {
			handlebarsLayouts(hbs);

			expect(helpers.block.call(null, 'foo')).to.be('');
			expect(helpers.block.call({ foo: 'bar' }, 'foo')).to.be('');

			expect(count).to.be(1);
		});
	});

	describe('#content', function () {
		it('should use fallback values as needed', function () {
			handlebarsLayouts(hbs);

			expect(helpers.content.call(null, 'foo')).to.be('');
			expect(helpers.content.call({ foo: 'bar' }, 'foo')).to.be('');

			expect(count).to.be(1);
		});
	});
});
