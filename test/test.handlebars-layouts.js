/*jshint node:true */
/*global describe, it */
'use strict';

var assert = require('assert');
var fs = require('fs');
var handlebars = require('handlebars');
var layoutHelpers = require('../lib/handlebars-layouts');

describe('extend', function () {
    it('should update blocks in a partial', function () {
        // Fixtures
        var data = require('./fixtures/data.json');
        var layout = fs.readFileSync(__dirname + '/fixtures/layout.hbt', 'utf8');
        var template = fs.readFileSync(__dirname + '/fixtures/template.hbt', 'utf8');
        var expected = fs.readFileSync(__dirname + '/fixtures/expected.html', 'utf8');

        // Test-specific Handlebars instance
        var hbs = handlebars.create();

        // Register layout helpers
        layoutHelpers(hbs);

        // Register partials
        hbs.registerPartial('layout', layout);

        // Assert
        assert.equal(hbs.compile(template)(data), expected);
    });
});
