// app/endpoints/root


/*
	Root route table for all of the endpoints.
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
