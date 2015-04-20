'use strict';

function noop() {
	return '';
}

function getStack(context) {
	return context._layoutStack || (context._layoutStack = []);
}

function initActions(context) {
	var stack = getStack(context),
		actions = {};

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

function applyAction(val, action) {
	/* jshint validthis:true */

	switch (action.mode) {
		case 'append': {
			return val + action.fn(this);
		}

		case 'prepend': {
			return action.fn(this) + val;
		}

		case 'replace': {
			return action.fn(this);
		}

		default: {
			return val;
		}
	}
}

function mixin(target) {
	var arg, key,
		len = arguments.length,
		i = 1;

	for (; i < len; i++) {
		arg = arguments[i];

		if (!arg) {
			continue;
		}

		for (key in arg) {
			/* istanbul ignore else */
			if (arg.hasOwnProperty(key)) {
				target[key] = arg[key];
			}
		}
	}

	return target;
}

/**
 * Registers layout helpers on an instance of Handlebars.
 *
 * @type {Function}
 * @param {Object} handlebars Handlebars instance.
 * @return {Object} Handlebars instance.
 */
function layouts(handlebars) {
	var helpers = {
		/**
		 * @method extend
		 * @param {String} name
		 * @param {Object} options
		 * @param {Function(Object)} options.fn
		 * @param {Object} options.hash
		 * @return {String} Rendered partial.
		 */
		extend: function (name, options) {
			options = options || {};

			var fn = options.fn || noop,
				context = Object.create(this || {}),
				template = handlebars.partials[name];

			// Mix attributes into context
			mixin(context, options.hash);

			// Partial template required
			if (template == null) {
				throw new Error('Missing partial: \'' + name + '\'');
			}

			// Compile partial, if needed
			if (typeof template !== 'function') {
				template = handlebars.compile(template);
			}

			// Add overrides to stack
			getStack(context).push(fn);

			// Render partial
			return template(context);
		},

		/**
		 * @method embed
		 * @return {String} Rendered partial.
		 */
		embed: function () {
			var context = Object.create(this || {});

			// Reset context
			context._layoutStack = null;
			context._layoutActions = null;

			// Extend
			return helpers.extend.apply(context, arguments);
		},

		/**
		 * @method block
		 * @param {String} name
		 * @param {Object} options
		 * @param {Function(Object)} options.fn
		 * @return {String} Modified block content.
		 */
		block: function (name, options) {
			options = options || {};

			var fn = options.fn || noop,
				context = this || {};

			return getActionsByName(context, name).reduce(
				applyAction.bind(context),
				fn(context)
			);
		},

		/**
		* @method blockExists
		* @param {String} names
		* @param {Object} options
		* @param {Function(Object)} options.fn
		* @return {String} Modified block content.
		*/
		blockExists: function (names, options) {
			options = options || {};

			var fn = options.fn || noop;
			names = names ? names.split('||') : [];

			for (var i = 0; i < names.length; i++) {
				var context = this || {},
					name = names[i].trim(),
					action = getActionsByName(context,name);

				if (!action.length) {
					continue;
				}
				return fn(context);
			}

			return '';
		},

		/**
		 * @method content
		 * @param {String} name
		 * @param {Object} options
		 * @param {Function(Object)} options.fn
		 * @param {Object} options.hash
		 * @param {String} options.hash.mode
		 * @return {String} Always empty.
		 */
		content: function (name, options) {
			options = options || {};

			var fn = options.fn || noop,
				hash = options.hash || {},
				mode = hash.mode || 'replace',
				context = this || {};

			getActionsByName(context, name).push({
				mode: mode.toLowerCase(),
				fn: fn
			});

			return '';
		}
	};

	handlebars.registerHelper(helpers);

	return handlebars;
}

/**
 * Assemble-compatible register method.
 *
 * @method register
 * @param {Object} handlebars Handlebars instance.
 * @return {Object} Handlebars instance.
 * @static
 */
layouts.register = layouts;

module.exports = layouts;
