'use strict';

var fs = require('fs');
var handlebars = require('handlebars');
var handlebarsLayouts = require('../index');

describe('handlebars-layouts', function () {
    // Register Helpers
    handlebarsLayouts(handlebars);

    // Register Partials
    handlebars.registerPartial('layout', fs.readFileSync(__dirname + '/fixtures/layout.hbs', 'utf8'));
    handlebars.registerPartial('layout_simple', fs.readFileSync(__dirname + '/fixtures/layout_simple.hbs', 'utf8'));
    handlebars.registerPartial('sublayout', fs.readFileSync(__dirname + '/fixtures/sublayout.hbs', 'utf8'));
    handlebars.registerPartial('partial1', fs.readFileSync(__dirname + '/fixtures/partial1.hbs', 'utf8'));
    handlebars.registerPartial('partial2', fs.readFileSync(__dirname + '/fixtures/partial2.hbs', 'utf8'));
    handlebars.registerPartial('partial3', fs.readFileSync(__dirname + '/fixtures/partial3.hbs', 'utf8'));
    handlebars.registerPartial('func', handlebars.compile('func'));

    it('should throw an error if partial is not registered', function () {
        var undef = function () {
            var template = handlebars.compile('{{#extend "undef"}}{{/extend}}');
            template({});
        };

        expect(undef).toThrow();
    });

    it('should not compile if partial is already a function', function () {
        var template = handlebars.compile('{{#extend "func"}}{{/extend}}');

        expect(template({})).toBe('func');
    });

    it('should render layouts properly', function () {
        var data = require('./fixtures/data.json');
        var template = handlebars.compile(fs.readFileSync(__dirname + '/fixtures/template.hbs', 'utf8'));

        expect(template(data)).toBe(fs.readFileSync(__dirname + '/expected/output.html', 'utf8'));
    });

    it('should properly render programmatically-composed layouts', function () {
        var data = {};
        var template = handlebars.compile(fs.readFileSync(__dirname + '/fixtures/template_non_extending.hbs', 'utf8'));

        // Render the template, which populates data._blocks
        data.body = template(data);
        expect(data._blocks).toBeDefined();

        var layout = handlebars.compile(fs.readFileSync(__dirname + '/fixtures/layout_simple.hbs', 'utf8'));
        expect(layout(data)).toBe(fs.readFileSync(__dirname + '/expected/output_simple.html', 'utf8'));
    });

    it('should properly render self-modifying layouts', function () {
        var data = {};
        var template = handlebars.compile(fs.readFileSync(__dirname + '/fixtures/layout_self_modifying.hbs', 'utf8'));
        expect(template(data)).toBe(fs.readFileSync(__dirname + '/expected/output_self_modifying.html', 'utf8'));
    });

    it('should properly render layouts included as partials', function () {
        var data = {};
        var template =
            handlebars.compile(fs.readFileSync(__dirname + '/fixtures/template_including_layout.hbs', 'utf8'));
        expect(template(data)).toBe(fs.readFileSync(__dirname + '/expected/output_simple.html', 'utf8'));
    });
});
