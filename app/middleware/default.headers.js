// app/middleware/default.headers


/*
	Easy-mode CORS and other goodies.
*/


var bodyParser = require('body-parser');

module.exports = {
	attach: function(app) {
		app.use(function (req, res, next) {
			res.header('Access-Control-Allow-Origin', '*');
  			res.header('Access-Control-Allow-Headers',
  				'Origin, X-Requested-With, Content-Type, Accept', 'Content-Length');
  			next();
		});
	}
};
