(function(e){if("function"==typeof bootstrap)bootstrap("handlebars-layouts",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeHandlebarsLayouts=e}else"undefined"!=typeof window?window.handlebarsLayouts=e():global.handlebarsLayouts=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
/*jshint node:true */
'use strict';

module.exports = function (handlebars) {
    handlebars.registerHelper('extend', function (partial, options) {
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
        return handlebars.compile(template)(context);
    });

    handlebars.registerHelper('append', function (block, options) {
        this.blocks = this.blocks || {};

        this.blocks[block] = {
            should: 'append',
            fn: options.fn
        };
    });

    handlebars.registerHelper('prepend', function (block, options) {
        this.blocks = this.blocks || {};

        this.blocks[block] = {
            should: 'prepend',
            fn: options.fn
        };
    });

    handlebars.registerHelper('replace', function (block, options) {
        this.blocks = this.blocks || {};

        this.blocks[block] = {
            should: 'replace',
            fn: options.fn
        };
    });

    handlebars.registerHelper('block', function (name, options) {
        this.blocks = this.blocks || {};

        var block = this.blocks[name];

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
    });

    return handlebars;
};

},{}]},{},[1])(1)
});
;