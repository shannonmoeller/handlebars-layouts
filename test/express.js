'use strict';

var handlebarsLayouts = require('../index'),
	express = require('express'),
	hbs = require('hbs'),
	utils = require('hbs-utils')(hbs),
	data = require('./fixtures/data/users.json'),
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
	.get('/append',  function (req, res) { res.render('append',  data); })
	.get('/embed',   function (req, res) { res.render('embed',   data); })
	.get('/extend',  function (req, res) { res.render('extend',  data); })
	.get('/prepend', function (req, res) { res.render('prepend', data); })
	.get('/replace', function (req, res) { res.render('replace', data); })

	// Start
	.listen(3000);

console.log('Express server listening on port 3000');
