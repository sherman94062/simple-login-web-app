// app/helpers/prep.query


/*
	Takes a validation hash and a query params hash,
	  and produces a ? param string fragment.
*/

module.exports = function(validatorSet, queryParams) {

	// Iteration through all possibe keys in accepted set
	return Object.keys(validatorSet).reduce(function(queryString, key) {

		// Ensure key exists in request
		if (queryParams[key] &&
			// Since we accept both arrays and singles
			Array.isArray(validatorSet[key])
			// "Exists X in validatorSet[key] such that X(queryParams[key])"
			? validatorSet[key].some(accepts(queryParams[key]))
			// The singular passes
			: accepts(queryParams[key])(validatorSet[key])) {

				// Append `key=value` to reduction sequence
				queryString += [
					key,
					queryParams[key]
				].join('=') + '&';

		} else {
			// Do not allow pass through of invalid parameters
			delete queryParams[key];
		}
		// Return extended parameter sequence
		return queryString;

	}, '').replace(/&$/, '');
}

// Curried to allow EXISTS X SUCH THAT X(elem) shorthand
//   with Array.prototype.some
function accepts(value) {
	return function(validator) {
		switch (typeof validator) {
			case 'function':
				return validator(value);
			// Should be RegExp
			case 'object':
				return validator.test && validator.test(value);
			case 'string':
				return value === validator;
		}
	}
}
