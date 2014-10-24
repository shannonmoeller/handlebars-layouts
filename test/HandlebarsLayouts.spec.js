'use strict';

var handlebarsLayouts = require('../index'),
	expect = require('expect.js');

describe('handlebars-layouts spec', function () {
	it('should register helpers', function () {
		var count = 0,
			mock = {
				registerHelper: function (helpers) {
					count++;

					expect(helpers.extend).to.be.a(Function);
					expect(helpers.embed).to.be.a(Function);
					expect(helpers.block).to.be.a(Function);
					expect(helpers.content).to.be.a(Function);
				}
			};

		handlebarsLayouts(mock);

		expect(count).to.be(1);
	});

	describe('register', function () {
		it('should register helpers', function () {
			var count = 0,
				mock = {
					registerHelper: function (helpers) {
						count++;

						expect(helpers.extend).to.be.a(Function);
						expect(helpers.embed).to.be.a(Function);
						expect(helpers.block).to.be.a(Function);
						expect(helpers.content).to.be.a(Function);
					}
				};

			handlebarsLayouts.register(mock);

			expect(count).to.be(1);
		});
	});

	describe('#extend', function () {
		it('should use fallback values as needed', function () {
			var helpers,
				count = 0,
				mock = {
					partials: {
						foo: function (data) {
							count++;
							return (data && data.foo) || '';
						}
					},
					registerHelper: function (h) {
						count++;
						helpers = h;
					}
				};

			handlebarsLayouts(mock);

			expect(helpers.extend.call(null, 'foo')).to.be('');
			expect(helpers.extend.call({ foo: 'bar' }, 'foo')).to.be('bar');

			expect(count).to.be(3);
		});
	});

	describe('#embed', function () {
		it('should use fallback values as needed', function () {
			var helpers,
				count = 0,
				mock = {
					partials: {
						foo: function (data) {
							count++;
							return (data && data.foo) || '';
						}
					},
					registerHelper: function (h) {
						count++;
						helpers = h;
					}
				};

			handlebarsLayouts(mock);

			expect(helpers.embed.call(null, 'foo')).to.be('');
			expect(helpers.embed.call({ foo: 'bar' }, 'foo')).to.be('bar');

			expect(count).to.be(3);
		});
	});

	describe('#block', function () {
		it('should use fallback values as needed', function () {
			var helpers,
				count = 0,
				mock = {
					partials: {
						foo: function (data) {
							count++;
							return (data && data.foo) || '';
						}
					},
					registerHelper: function (h) {
						count++;
						helpers = h;
					}
				};

			handlebarsLayouts(mock);

			expect(helpers.block.call(null, 'foo')).to.be('');
			expect(helpers.block.call({ foo: 'bar' }, 'foo')).to.be('');

			expect(count).to.be(1);
		});
	});

	describe('#content', function () {
		it('should use fallback values as needed', function () {
			var helpers,
				count = 0,
				mock = {
					partials: {
						foo: function (data) {
							count++;
							return (data && data.foo) || '';
						}
					},
					registerHelper: function (h) {
						count++;
						helpers = h;
					}
				};

			handlebarsLayouts(mock);

			expect(helpers.content.call(null, 'foo')).to.be('');
			expect(helpers.content.call({ foo: 'bar' }, 'foo')).to.be('');

			expect(count).to.be(1);
		});
	});
});
