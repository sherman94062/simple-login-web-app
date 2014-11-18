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
				req.params.index,
				req.params.mapping,
				req.params.document,
				'_mlt?min_term_freq=1&min_doc_freq=1&include=true'
			].join('/'),
			res);
		}
	}
];
