// app/endpoints/v1/search/similarity/root


/*
	Similarity searches use proximity to another document
	  to rank relevancy.

	Uses a "more like this" processor on the DB.
*/


var Database = helper('db');

module.exports = [
	{
		verb: 'GET',
		path: '/:index/:mapping/:document',
		handler: function(req, res) {
			Database.get('/' + [
				req.param.index,
				req.param.mapping,
				req.param.document,
				'_mlt'
			].join('/'),
			function(err) {
				res.statusCode = 404;
				res.json({
					message: '404 Not Found: Document not found, cannot calculate proximities.'
				});
			}, res.json);
		}
	}
];
