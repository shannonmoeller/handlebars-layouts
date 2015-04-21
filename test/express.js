'use strict';

var handlebarsLayouts = require('../index'),
	consolidate = require('consolidate'),
	express = require('express'),
	fs = require('fs'),
	handlebars = require('handlebars'),
	data = require('./fixtures/data/users.json'),
	fixtures = process.cwd() + '/fixtures',
	views = fixtures + '/templates',
	partials = fixtures + '/partials';

// Register helpers
handlebars.registerHelper(handlebarsLayouts(handlebars));

// Register partials
handlebars.registerPartial({
	layout:     fs.readFileSync(partials + '/layout.hbs', 'utf8'),
	layout2col: fs.readFileSync(partials + '/layout2col.hbs', 'utf8'),
	media:      fs.readFileSync(partials + '/media.hbs', 'utf8'),
	user:       fs.readFileSync(partials + '/user.hbs', 'utf8')
});

// Server
express()
	// Settings
	.set('views', views)
	.set('view engine', 'html')

	// Engines
	.engine('html', consolidate.handlebars)

	// Routes
	.get('/:id', function (req, res) {
		res.render(req.params.id, data);
	})

	// Start
	.listen(3000);

console.log('Express server listening on port 3000');
