// app/endpoints/v1/search/root


/*
	All search type subspaces will be defined here.

	We may also include parent route information, or a listing endpoint.
*/


module.exports = {
	context: __dirname,
	children: [
		'faceted',
		'like',
		'freetext'
	]
};
