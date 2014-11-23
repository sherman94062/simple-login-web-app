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
			}, function(json) {
				res.json(Object.keys(json).map(function(key) {
					return {
						index: key,
						aliases: Object.keys(json[key].aliases)
					};
				}));
			});
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
				Database.get('/' + req.params.index + '/_mapping', badIndex, function(json) {
					res.json(Object.keys(json[Object.keys(json)[0]].mappings));
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
					badMapping, function(json) {
						res.json(json[Object.keys(json)[0]]
							.mappings[req.params.mapping].properties);
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
