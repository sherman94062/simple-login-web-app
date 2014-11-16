// app/health/root


/*
	Various health and usage stats
*/


var qpsTally = appRoot('middleware/qps');
var http	 = require('http');


module.exports = [
	{
		verb: 'GET',
		path: '/',
		handler: function(req, res) {
			var esReq = http.get(serviceConfigs.es, function(esRes) {
				var chunks = '';
				esRes.on('data', function(data) {
					chunks += data.toString();
				});
				esRes.on('end', function() {
					res.json({
						qps: qpsTally.getCount(),
						es: chunks
					});
				});
				esRes.on('error', handleEsError);
			});
			esReq.on('error', handleEsError);

			function handleEsError(err) {
				res.statusCode = 500;
				res.json({
					qps: qpsTally.getCount(),
					es: err.toString()
				});
			}
		}
	}
];
