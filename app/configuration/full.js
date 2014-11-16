// app/configuration/full


/* 
	Merges all configuration sources into one hash.

	Configurations are cascaded in order of writing.
	That is, the bottom in this array (command line) is the most important.

	The object is frozen so one cannot accidentally reconfigure while running.
*/

var configSources = [
	'defaults',
	'environment',
	'commandline'
];

module.exports = Object.freeze(configSources
	.map(function(source) {
		return require('./' + source);
	})
	.reduce(function(hash, source) {
		Object.keys(source).forEach(function(key) {
			hash[key] = source[key];
		});
		return hash;
	}, {}));
