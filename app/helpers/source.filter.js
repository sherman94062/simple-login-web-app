// app/helpers/source.filter


/*
	For a given set, performs a set of deep gets on each element.
*/


module.exports = function(req, res) {
	// Just stream if is nothing found for pathing selections
	return !req.fieldSelection ? res : function(json) {
		var sourceFilter = multiFilter(req.fieldSelection);
		(json.hits.hits || []).forEach(function(hit) {
			hit._source = sourceFilter(hit._source);
		});
		res.json(json);
	};
}


function multiFilter(okPaths) {
	return multiFunc(okPaths, okPaths.map(getter));
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
