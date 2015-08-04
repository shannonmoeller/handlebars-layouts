/*eslint-env mocha */
'use strict';

var expect = require('expect');

describe('handlebars-layouts spec', function () {
	var count, handlebars, handlebarsLayouts;

	beforeEach(function () {
		count = 0;

		// Delete
		delete require.cache[require.resolve('handlebars')];
		delete require.cache[require.resolve('../index')];

		// Reload
		handlebars = require('handlebars');
		handlebarsLayouts = require('../index');

		handlebars.registerPartial('foo', function (data) {
			count++;

			return data && data.foo || '';
		});
	});

	it('should generate helpers', function () {
		var helpers = handlebarsLayouts(handlebarsLayouts);

		expect(helpers.extend).toBeA(Function);
		expect(helpers.embed).toBeA(Function);
		expect(helpers.block).toBeA(Function);
		expect(helpers.content).toBeA(Function);

		expect(count).toBe(0);
	});

	describe('register', function () {
		it('should register helpers', function () {
			var spy = expect.spyOn(handlebars, 'registerHelper');

			handlebarsLayouts.register(handlebars);
			expect(spy.calls.length).toBe(1);
			spy.restore();
		});
	});

	describe('#extend', function () {
		it('should use fallback values as needed', function () {
			var helpers = handlebarsLayouts.register(handlebars);

			expect(helpers.extend.call(null, 'foo')).toBe('');
			expect(helpers.extend.call({ foo: 'bar' }, 'foo')).toBe('bar');

			expect(count).toBe(2);
		});
	});

	describe('#embed', function () {
		it('should use fallback values as needed', function () {
			var helpers = handlebarsLayouts.register(handlebars);

			expect(helpers.embed.call(null, 'foo')).toBe('');
			expect(helpers.embed.call({ foo: 'bar' }, 'foo')).toBe('bar');

			expect(count).toBe(2);
		});
	});

	describe('#block', function () {
		it('should use fallback values as needed', function () {
			var helpers = handlebarsLayouts.register(handlebars);

			expect(helpers.block.call(null, 'foo')).toBe('');
			expect(helpers.block.call({ foo: 'bar' }, 'foo')).toBe('');

			expect(count).toBe(0);
		});
	});

	describe('#content', function () {
		it('should use fallback values as needed', function () {
			var helpers = handlebarsLayouts.register(handlebars);

			expect(helpers.content.call(null, 'foo')).toBe(false);
			expect(helpers.content.call({ foo: 'bar' }, 'foo')).toBe(false);

			expect(count).toBe(0);
		});
	});
});
