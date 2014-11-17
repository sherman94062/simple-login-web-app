// app/configuration/commandline


/*
	Process command line inputs from service invocation command.

	Configuration keys are prefixed with `--`.
	String values use `--<keyname> <value>` patterning.
	Boolean flags are set to true by omitting a `<value>`.
*/


module.exports = process.argv.reduce(function(hash, arg, idx, array) {

	var next = array[idx + 1];

	// We have identified a keyname
	if (!arg.indexOf('--')) {
		// Lookahead for non-key
		//   ? Remove leading dashes
		//   : Non-value keys are boolean
		hash[arg.substr(2).toLowerCase()] = next && next.indexOf('--') ? next : true;
	}

	return hash;

}, {});
