// app/helpers/db


/*
	Speed up DB queries with this
*/

var url		= require('url');
var http	= require('http');


var dbHostname;
var dbPort;

try {
	dbHostname	= url.parse(serviceConfigs.db).hostname;
	dbPort		= url.parse(serviceConfigs.db).port;
} catch (err) {
	throw "Invalid host for --db <value>";
}



module.exports = {
	post: function(path, body, errFn, fn) {
		makeRequest('POST', path, JSON.stringify(body), errFn, fn);
	},
	get: function(path, errFn, fn) {
		makeRequest('GET', path, undefined, errFn, fn);
	}
};

function makeRequest(method, path, body, errFn, fn) {
	http.request({
		method: method,
		path: path,
		port: dbPort,
		host: dbHostname
	}, callback)
	.on('error', errFn)
	.end(body);


	function callback(res) {
		var data = '';

		res.on('end', function() {
			fn(JSON.parse(data));
		});

		res.on('data', function(chunk) {
			data += chunk;
		});

		res.on('error', function(err) {
			errFn(err.toString());
		});
	}

}

