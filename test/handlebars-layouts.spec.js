'use strict';

var handlebarsLayouts = require('../index'),
	expect = require('expect');

describe('handlebars-layouts spec', function () {
	var count, hbs;

	beforeEach(function () {
		count = 0;

		hbs = {
			partials: {
				foo: function (data) {
					count++;

					return (data && data.foo) || '';
				}
			},
			registerHelper: function (helpers) {
				count++;

				expect(helpers.extend).toBeA(Function);
				expect(helpers.embed).toBeA(Function);
				expect(helpers.block).toBeA(Function);
				expect(helpers.content).toBeA(Function);
			}
		};
	});

	it('should generate helpers', function () {
		var helpers = handlebarsLayouts(hbs);

		expect(helpers.extend).toBeA(Function);
		expect(helpers.embed).toBeA(Function);
		expect(helpers.block).toBeA(Function);
		expect(helpers.content).toBeA(Function);

		expect(count).toBe(0);
	});

	describe('register', function () {
		it('should register helpers', function () {
			handlebarsLayouts.register(hbs);

			expect(count).toBe(1);
		});
	});

	describe('#extend', function () {
		it('should use fallback values as needed', function () {
			var helpers = handlebarsLayouts.register(hbs);

			expect(helpers.extend.call(null, 'foo')).toBe('');
			expect(helpers.extend.call({ foo: 'bar' }, 'foo')).toBe('bar');

			expect(count).toBe(3);
		});
	});

	describe('#embed', function () {
		it('should use fallback values as needed', function () {
			var helpers = handlebarsLayouts.register(hbs);

			expect(helpers.embed.call(null, 'foo')).toBe('');
			expect(helpers.embed.call({ foo: 'bar' }, 'foo')).toBe('bar');

			expect(count).toBe(3);
		});
	});

	describe('#block', function () {
		it('should use fallback values as needed', function () {
			var helpers = handlebarsLayouts.register(hbs);

			expect(helpers.block.call(null, 'foo')).toBe('');
			expect(helpers.block.call({ foo: 'bar' }, 'foo')).toBe('');

			expect(count).toBe(1);
		});
	});

	describe('#content', function () {
		it('should use fallback values as needed', function () {
			var helpers = handlebarsLayouts.register(hbs);

			expect(helpers.content.call(null, 'foo')).toBe('');
			expect(helpers.content.call({ foo: 'bar' }, 'foo')).toBe('');

			expect(count).toBe(1);
		});
	});
});
