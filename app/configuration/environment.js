// app/configuration/environment


/*
	Searches host environment for environment settings.

	The `keySignature` defines the search pattern.
*/


var keySignature = /API_(\w+)/;

module.exports = Object.keys(process.env)
	.filter(function(key) {
		return key.match(keySignature);
	})
	.reduce(function(hash, key) {
		hash[key.match(keySignature)[1]] = process.env[key];
		return hash;
	}, {});
