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
	.set('views', views)
	.set('view engine', 'html')
	.engine('html', require('hbs').__express)

	// Routes
	.get('/append',       function (req, res) { res.render('append',      data); })
	.get('/bogus',        function (req, res) { res.render('bogus',       data); })
	.get('/deep-extend',  function (req, res) { res.render('deep-extend', data); })
	.get('/embed',        function (req, res) { res.render('embed',       data); })
	.get('/prepend',      function (req, res) { res.render('prepend',     data); })
	.get('/replace',      function (req, res) { res.render('replace',     data); })

	// Start
	.listen(3000);

console.log('Express server listening on port 3000');
