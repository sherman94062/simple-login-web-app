// app/health/root


/*
	Various health and usage stats
*/


var qpsTally = appRoot('middleware/qps');

module.exports = [
	{
		verb: 'GET',
		path: '/',
		handler: function(req, res) {
			res.json({
				qps: qpsTally.getCount()
			});
		}
	}
];
