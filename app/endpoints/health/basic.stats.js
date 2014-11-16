// app/endpoints/health/basic.stats


/*
	Pulls QPS metric and DB latency.

	Returns 500 if DB is unreachable.
*/


var qpsTally = appRoot('middleware/qps');
var http	 = require('http');


module.exports = function(req, res) {
	var outBoundDbTime = Date.now();

	var dbReq = http.get(serviceConfigs.db, function(dbRes) {
		dbRes.on('data', function(data) {
			res.json({
				qps: qpsTally.getCount(),
				db: {
					reachable: true,
					latency: (Date.now() - outBoundDbTime) + ' ms'
				}
			});
		});
		dbRes.on('error', handleDbError);
	});

	dbReq.on('error', handleDbError);

	function handleDbError(err) {
		res.statusCode = 500;
		res.json({
			qps: qpsTally.getCount(),
			db: {
				reachable: false,
				latency: 'N/A',
				endpoint: serviceConfigs.db + ''
			}
		});
	}
};
