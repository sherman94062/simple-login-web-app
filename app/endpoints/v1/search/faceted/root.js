


var Database = helper('db');


module.exports = [
	{
		verb: 'GET',
		path: '/*',
		handler: function(req, res) {
			res.setHeader('Allow', 'POST');
			res.statusCode = 405;
			res.json({
				message: '405 Invalid Method: Please use POST, ' +
					'as request bodies often RFC limitations on GET URL lengths.'
			});
		}
	},
	{
		verb: 'POST',
		paths: ['/', '/:index', '/:index/:mapping'],
		handler: function(req, res) {
			var url = '/' +
				(req.params.index ? req.params.index + '/' : '') +
				(req.params.mapping ? req.params.mapping + '/' : '') +
				'_search';

			var computedQuery = mapFacets(req.body);

			if (!computedQuery) {
				res.statusCode = 400;
				res.end();
			} else {
				Database.post(url, computedQuery, function(err) {
					res.statusCode = ~err.indexOf('No handler') ? 404 : 500;
					res.end();
				}, function(results) {
					if (results.hits.hits) {
						results.hits.hits.forEach(function(hit) {
							delete hit._source.compare;
							hit._source.enriched = hit._source.display;
							hit._source.base	 = hit._source.product;
							delete hit._source.display;
							delete hit._source.product;
						});
					}
					res.json(results);
				});
			}
		}
	}
];
