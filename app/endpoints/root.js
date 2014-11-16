// app/endpoints/root


/*
	Root route for all of the service.
*/


module.exports = {
	context: __dirname,
	children: [
		'health',
		'v1'
	],
	routes: [
		{
			verb: 'GET',
			path: '/',
			handler: function(req, res) {
				res.json({
					message: 'Hello World!'
				});
			}
		}
	]
};
