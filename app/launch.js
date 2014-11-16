// app/launch


/*
	Startup logic for app.

	(1) Loads configurations
	(2) Creates Express.js app
	(3) Applies middleware
	(4) Loads root of endpoint route tables
	(5) Listens for requests
	(6) Logs the start
*/


// (1) Load configs
var configs    = require('./configuration/full');

// (2) Create Express.js application
var express    = require('express');
var app        = express();

// (3) Attach middleware layers
require('./middleware/registry').attach(app);

// (4) Attach root route table
app.use(helper('router').generate(require('./endpoints/root')));

// (5) Begin listening for traffic
app.listen(configs.port);

// (6) Log that server is online
console.info(JSON.stringify({
	level: 'INFO',
	type: 'server',
	event: 'start',
	data: {
		port: configs.port
	}
}));
