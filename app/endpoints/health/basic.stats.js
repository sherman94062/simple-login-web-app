// app/endpoints/health/basic.stats


/*
	Pulls QPS metric and DB latency.
	
	(1) Records time in ms
	(2) Send start HTTP to DB
		(2a) If DB there, respond to client with QPS and latency in JSON
		(2b) If DB not there, respond with QPS and DB endpoint for debugging

	Returns 500 if DB is unreachable.
*/


var qpsTally = appRoot('middleware/qps');
var Database = helper('db');


module.exports = function(req, res) {

	// (1) For DB latency benchmark
	var outBoundDbTime = Date.now();

	// (2) Hitting the DB for health check...
	Database.get('/', handleDbError, sendStats);

	// (2a) There, send latency stat
	function sendStats(data) {
		res.json({
			qps: qpsTally.getCount(),
			db: {
				reachable: true,
				latency: (Date.now() - outBoundDbTime) + ' ms'
			}
		});
	}

	// (2b) Not there, oops
	function handleDbError(err) {
		res.statusCode = 500;
		res.json({
			qps: qpsTally.getCount(),
			db: {
				reachable: false,
				latency: null,
				endpoint: serviceConfigs.db || null
			}
		});
	}
};
