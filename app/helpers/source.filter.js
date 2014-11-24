// app/helpers/source.filter


/*
	For a given set, performs a set of deep gets on each element.
*/


module.exports = function(useableFields) {
	return multiFunc(usableFields, useableFields.map(getter));
};


function multiFunc(fieldNames, fnSet) {
	return function(item) {
		var hash = {};
		fieldNames.forEach(function(key, index) {
			hash[key] = fnSet[index](item);
		});
		return hash;
	};
}


function getter(string) {
	return [].reduce.bind(string.split('.'), function(hash, key) {
		return hash && hash[key];
	});
}
