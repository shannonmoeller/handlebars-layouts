'use strict';

var handlebarsLayouts = require('../index'),
	express = require('express'),
	hbs = require('hbs'),
	utils = require('hbs-utils')(hbs),
	data = require('./fixtures/data.json'),
	views = process.cwd() + '/fixtures',
	partials = views + '/partials';

// Register helpers
handlebarsLayouts(hbs.handlebars);

// Register partials
utils.registerPartials(partials);

// Server
express()
	// Settings
	.set('view engine', 'hbs')
	.set('views', views)

	// Routes
	.get('/template', function (req, res) {
		res.render('template', data);
	})
	.get('/page1', function (req, res) {
		res.render('page1', data);
	})
	.get('/page2', function (req, res) {
		res.render('page2', data);
	})

	// Start
	.listen(3000);

console.log('Express server listening on port 3000');
