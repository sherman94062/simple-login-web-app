// app/endpoints/v1/random/root


/*
	Allows random access queries to indices.
*/


var Database = helper('db');
var SourceFilter = helper('source.filter');

var randomSeachQuery = {
	query: {
		function_score: {
			query: {
				match_all: {}
			},
			random_score: {}
		}
	}
};

module.exports = [{
	verb: 'GET',
	paths: ['/', '/:index', '/:index/:mapping'],
	acceptParams: {
		search_size: /^\d+$/,
		size: 		 /^\d+$/
	},
	handler: function(req, res) {

		var randomSearchPath = '/' + 
			conditional(req.params.index) +
			conditional(req.params.mapping) +
			'_search?' + req.preppedQuery.split('&')[0];

		Database.post(randomSearchPath,
		randomSeachQuery,
		function(err) {
			res.statusCode = 404;
			res.json({
				message: '404 Not Found: Search scope not found.'
			});
		}, SourceFilter(req, res));

	}
}];


function conditional(fragment) {
	return fragment ? (fragment + '/') : '';
}
