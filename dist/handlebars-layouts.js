(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function getBlocks(context, name) {
	var blocks = context._blocks;

	return blocks[name] || (blocks[name] = []);
}

function layouts(handlebars) {
	handlebars.registerHelper({
		extend: function (partial, options) {
			var context = Object.create(this),
				template = handlebars.partials[partial];

			// Partial template required
			if (template == null) {
				throw new Error('Missing layout partial: \'' + partial + '\'');
			}

			// New block context
			context._blocks = {};

			// Parse blocks and discard output
			options.fn(context);

			// Render final layout partial with revised blocks
			if (typeof template !== 'function') {
				template = handlebars.compile(template);
			}

			// Compile, then render
			return template(context);
		},

		append: function (name, options) {
			getBlocks(this, name).push({
				should: 'append',
				fn: options.fn
			});
		},

		prepend: function (name, options) {
			getBlocks(this, name).push({
				should: 'prepend',
				fn: options.fn
			});
		},

		replace: function (name, options) {
			getBlocks(this, name).push({
				should: 'replace',
				fn: options.fn
			});
		},

		block: function (name, options) {
			var block = null,
				retval = options.fn(this),
				blocks = getBlocks(this, name),
				length = blocks.length,
				i = 0;

			for (; i < length; i++) {
				block = blocks[i];

				switch (block && block.fn && block.should) {
					case 'append': {
						retval = retval + block.fn(this);
						break;
					}

					case 'prepend': {
						retval = block.fn(this) + retval;
						break;
					}

					case 'replace': {
						retval = block.fn(this);
						break;
					}
				}
			}

			return retval;
		}
	});

	return handlebars;
}

// Assemble
layouts.register = layouts;

// Legacy
module.exports = layouts;

},{}]},{},[1]);
