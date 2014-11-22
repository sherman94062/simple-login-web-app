// app/endpoints/metadata/root


/*
	This subspace allows you to query for indexed metadata.
*/


var Database = helper('db');


module.exports = [
	{
		verb: 'GET',
		path: '/',
		handler: function(req, res) {
			Database.get('/_aliases', function(err) {
				res.statusCode = 500;
				res.json({
					message: '500 Internal Server Error: ' +
						'Could not access root metadata.'
				});
			}, res);
		}
	},
	{
		verb: 'GET',
		path: '/:index',
		handler: function(req, res) {
			// Only going to allow single-index queries
			if (!isWord(req.params.index)) {
				badIndex();
			} else {
				Database.get('/' + req.params.index + '/_mapping', badIndex, function(data) {
					var json = {};
					json[req.params.index] = Object.keys(data[Object.keys(data)[0]]);
					res.json(json);
				});
			}
			
			function badIndex() {
				res.statusCode = 404;
				res.json({
					message: '404 Not Found: Could not find index "' +
						req.params.index + '".'
				});
			}
		}
	},
	{
		verb: 'GET',
		path: '/:index/:mapping',
		handler: function(req, res) {
			if (!isWord(req.params.index) || !isWord(req.params.mapping)) {
				badMapping();
			} else {
				Database.get('/' + req.params.index + '/' + req.params.mapping + '/_mapping',
					badMapping, function(data) {
						var json = {};
						json[req.params.index] = data[Object.keys(data)[0]]
							.mappings[req.params.mapping].properties;
						res.json(json);
					});
			}

			function badMapping() {
				res.statusCode = 404;
				res.json({
					message: '404 Not Found: Could not find index/mapping "' +
						req.params.index + '/' + req.params.mapping + '".'
				});
			}
		}
	}
];

function isWord(string) {
	return string.match(/^\w+$/);
}

