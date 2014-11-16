



module.exports = [
	{
		verb: 'GET',
		path: '/*',
		handler: function(req, res) {
			res.json({
				message: 'You must use POST for facet queries.'
			});
		}
	},
	{
		verb: 'POST',
		path: '/',
		handler: function(req, res) {
			res.json({
				message: 'Thanks buddy'
			});
		}
	}
];
