/*jshint node:true */
'use strict';

module.exports = function (handlebars) {
    if (!handlebars) {
        handlebars = require('handlebars');
    }

    handlebars.registerHelper({
        extend: function (partial, options) {
            var output = null;
            var context = Object.create(this);
            var template = handlebars.partials[partial];

            // Partial template required
            if (typeof template === 'undefined') {
                throw new Error("Missing layout partial: '" + partial + "'");
            }

            // Parse blocks and discard output
            options.fn(context);

            // Render final layout partial with revised blocks
            if (typeof template === 'function') {
                return template(context);
            } else {
                return handlebars.compile(template)(context);
            }
        },

        append: function (block, options) {
            this.blocks = this.blocks || {};

            this.blocks[block] = {
                should: 'append',
                fn: options.fn
            };
        },

        prepend: function (block, options) {
            this.blocks = this.blocks || {};

            this.blocks[block] = {
                should: 'prepend',
                fn: options.fn
            };
        },

        replace: function (block, options) {
            this.blocks = this.blocks || {};

            this.blocks[block] = {
                should: 'replace',
                fn: options.fn
            };
        },

        block: function (name, options) {
            var block = null;

            this.blocks = this.blocks || {};
            block = this.blocks[name];

            switch (block && block.fn && block.should) {
                case 'append':
                    return options.fn(this) + block.fn(this);

                case 'prepend':
                    return block.fn(this) + options.fn(this);

                case 'replace':
                    return block.fn(this);

                default:
                    return options.fn(this);
            }
        }
    });

    return handlebars;
};
