// app/middleware/bodyparser


/*
	Allows easy access to JSON POST bodies.

	In all routes, `req.body.keyName` now works.
*/


var bodyParser = require('body-parser');

module.exports = {
	attach: function(app) {
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());
	}
};
