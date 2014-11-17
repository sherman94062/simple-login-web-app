// app/endpoints/v1/search/faceted/post.handler


/*
	Allows posting of preference tuples plus a couple other meta-fields.

	Users may omit `:mapping` to wildcard the mapping on an index.
	Users may omit both URL route portions to wildcard the database.
	Users may set `:index` to `_all` to wildcard only the DB index (DB behavior).
*/


var Database  = helper('db');
var mapFacets = require('./facet.mapper');

var SCHEMA_SHIM = require('./temp.shim');


module.exports = {
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
				res.json(SCHEMA_SHIM(results));
			});
		}
	}
}
