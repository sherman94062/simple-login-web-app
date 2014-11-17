// app/middleware/api


/*
	Central registry of the middleware for the app.
	Middleware are functions that every request runs
	  through before final processing

	(1) Defines middlewares
	(2) Attaches them all to the application
*/


// (1) Define middlewares
var middleware = [
	'bodyparser',
	'qps'
];

// (2) Attach all middleware
module.exports = {
	attach: function(app) {
		middleware.forEach(function(middlewareName) {
			require('./' + middlewareName).attach(app);
		});
	}
};
