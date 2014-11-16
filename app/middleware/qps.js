// app/middleware/qps


/*
	Computes the number of queries in the last 1000 milliseconds.
*/


module.exports = {
	attach: function(app) {
		app.use(addQueryToCalculation);
	},
	getCount: function() {
		return qps;
	}
};

var qpsBuffer = [];
var qps = 0;

function addQueryToCalculation(req, res, next) {
	var now = Date.now();
	qpsBuffer.push(now);
	recomputeQps(now);
	next();
}

function recomputeQps(now) {
	var trail = now - 1000;
	while (qpsBuffer[0] < trail) {
		qpsBuffer.shift();
	}
	qps = qpsBuffer.length;
}

setInterval(function() {
	recomputeQps(Date.now());
}, 1000);
