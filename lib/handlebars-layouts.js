/*jshint node:true */
'use strict';

var getBlocks = function(name) {
    var blocks = this.blocks || (this.blocks = {});
    return blocks[name] || (blocks[name] = []);
};

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
            }

            // Compile, then render
            return handlebars.compile(template)(context);
        },

        append: function (name, options) {
            getBlocks.call(this, name).push({
                should: 'append',
                fn: options.fn
            });
        },

        prepend: function (name, options) {
            getBlocks.call(this, name).push({
                should: 'prepend',
                fn: options.fn
            });
        },

        replace: function (name, options) {
            getBlocks.call(this, name).push({
                should: 'replace',
                fn: options.fn
            });
        },

        block: function (name, options) {
            var block = null;
            var retval = options.fn(this);
            var blocks = getBlocks.call(this, name);
            var length = blocks.length;
            var i = 0;

            for (; i < length; i++) {
                block = blocks[i];

                switch (block && block.fn && block.should) {
                    case 'append':
                        retval = retval + block.fn(this);
                    break;

                    case 'prepend':
                        retval = block.fn(this) + retval;
                    break;

                    case 'replace':
                        retval = block.fn(this);
                    break;
                }
            }

            return retval;
        }
    });

    return handlebars;
};
