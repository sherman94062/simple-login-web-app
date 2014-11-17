// app/helpers/db


/*
	Speed up authorship of DB queries with this helper template.


	Since DB queries and replies will always be JSON,
	  there is no way to handle as streams,
	  as we need the entire payload to parse.

	Thus, we handle debuffering into strings,
	  and parsing of the JSON, as well as providing
	  structure to callbacks and forcing error handling
	  functions.
*/


var url		= require('url');
var http	= require('http');

var SCHEMA_SHIM = require('./temp.shim');

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
			// REMOVAL OF SHIM POST-SCHEMA CHANGE
			fn(SCHEMA_SHIM(JSON.parse(data)));
		});

		res.on('data', function(chunk) {
			data += chunk;
		});

		res.on('error', function(err) {
			errFn(err.toString());
		});
	}

}
