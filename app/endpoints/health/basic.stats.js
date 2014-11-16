// app/endpoints/health/basic.stats


/*
	Pulls QPS metric and DB latency.

	Returns 500 if DB is unreachable.
*/


var qpsTally = appRoot('middleware/qps');
var http	 = require('http');


module.exports = function(req, res) {
	var outBoundEsTime = Date.now();

	var esReq = http.get(serviceConfigs.es, function(esRes) {
		esRes.on('data', function(data) {
			res.json({
				qps: qpsTally.getCount(),
				es: {
					reachable: true,
					latency: (Date.now() - outBoundEsTime) + ' ms'
				}
			});
		});
		esRes.on('error', handleEsError);
	});

	esReq.on('error', handleEsError);

	function handleEsError(err) {
		res.statusCode = 500;
		res.json({
			qps: qpsTally.getCount(),
			es: {
				reachable: false,
				latency: 'N/A',
				endpoint: serviceConfigs.es + ''
			}
		});
	}
};
