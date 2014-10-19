(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function layouts(handlebars) {
	/*jshint validthis:true */

	function getStack(context) {
		return context._layoutStack || (context._layoutStack = []);
	}

	function initActions(context) {
		var stack = getStack(context),
			actions = [];

		context._layoutActions = actions;

		while (stack.length) {
			stack.pop()(context);
		}

		return actions;
	}

	function getActions(context) {
		return context._layoutActions || initActions(context);
	}

	function getActionsByName(context, name) {
		var actions = getActions(context);

		return actions[name] || (actions[name] = []);
	}

	function extend(name, options) {
		var context = Object.create(this),
			template = handlebars.partials[name];

		// Partial template required
		if (template == null) {
			throw new Error('Missing layout partial: \'' + name + '\'');
		}

		// Compile partial, if needed
		if (typeof template !== 'function') {
			template = handlebars.compile(template);
		}

		// Add overrides to stack
		getStack(context).push(options.fn);

		// Render partial
		return template(context);
	}

	function embed(/* name, options */) {
		var context = Object.create(this);

		// Reset context
		context._layoutStack = null;
		context._layoutActions = null;

		return extend.apply(context, arguments);
	}

	function block(name, options) {
		var actions = getActionsByName(this, name);

		function run(val, action) {
			return action(val);
		}

		return actions.reduce(run, options.fn(this));
	}

	function append(name, options) {
		var that = this;

		getActionsByName(this, name).push(function (val) {
			return val + options.fn(that);
		});
	}

	function prepend(name, options) {
		var that = this;

		getActionsByName(this, name).push(function (val) {
			return options.fn(that) + val;
		});
	}

	function replace(name, options) {
		var that = this;

		getActionsByName(this, name).push(function (/* val */) {
			return options.fn(that);
		});
	}

	handlebars.registerHelper({
		extend: extend,
		embed: embed,
		block: block,
		append: append,
		prepend: prepend,
		replace: replace
	});

	return handlebars;
}

// Assemble
layouts.register = layouts;

// Legacy
module.exports = layouts;

},{}]},{},[1]);
