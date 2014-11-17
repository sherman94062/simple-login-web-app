// app/endpoints/v1/search/faceted/temp.shim


/*
	THIS IS GOING AWAY SOON, when schema changes
*/


module.exports = function(response) {
	if (response.hits.hits) {
		response.hits.hits.forEach(function(hit) {
			delete hit._source.compare;
			hit._source.enriched = hit._source.display;
			hit._source.base	 = hit._source.product;
			delete hit._source.display;
			delete hit._source.product;
		});
	}
	return response;
};
