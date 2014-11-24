// app/endpoints/v1/item/root


/*
	Quick API for getting documents with know addresses.
*/


var Database = helper('db');
var SourceFilter = helper('source.filter');

module.exports = [{
	verb: 'GET',
	path: '/:index/:mapping/:ids',
	handler: function (req, res) {
		Database.post('/' + [
			req.params.index,
			req.params.mapping,
			'_mget'
		].join('/'), {
			ids: req.params.split(',')
		}, function(err) {
			req.statusCode = 404;
			req.json({
				message: '404 Not Found: ' +
					'Could not find documents.'
			});
		}, SourceFilter(req, res));
	}
}];
