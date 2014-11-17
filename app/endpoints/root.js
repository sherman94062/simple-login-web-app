// app/endpoints/root


/*
	Root route table for all of the endpoints.
	
	Subspaces will likely only consist of API 
		versions and a health check.

	Obligatory "Hello World!", heh.
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
