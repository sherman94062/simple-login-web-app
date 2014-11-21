// app/endpoints/v1/search/like/root


/*
	Similarity searches use proximity to another document
	  to rank relevancy.

	Uses a "more like this" vector space proximity model on the DB.
*/


var Database = helper('db');

module.exports = [
	{
		verb: 'GET',
		path: '/:index/:mapping/:document',
		acceptParams: {
			size: /^\d+$/,
			include: ['true', 'false']
		},
		handler: function(req, res) {
			Database.get('/' + [
				req.params.index,
				req.params.mapping,
				req.params.document,
				'_mlt?min_term_freq=1&min_doc_freq=1&include=true&' + req.preppedQuery
			].join('/'),
			function(err) {
				res.statusCode = 404;
				res.json({
					message: '404 Not Found: Document not found in ' +
						'index and mapping, cannot calculate proximities.'
				});
			}, res);
		}
	}
];
