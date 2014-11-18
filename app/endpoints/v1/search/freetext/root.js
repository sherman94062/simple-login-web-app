


module.exports = [
	{
		verb: 'GET',
		paths: ['/', '/:index', '/:index/:mapping'],
		handler: function(req, res) {
			res.json({
				index: req.params.index,
				mapping: req.params.mapping,
				message: 'stubbed! For free text search...'
			});
		}
	}
];
