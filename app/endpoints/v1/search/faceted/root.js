// app/endpoints/v1/search/faceted/root


/*
	Endpoint definitions for facet-tuple based searches.

	Only allows POST because of length restrictions.
*/


module.exports = [
	require('./get.stub'),
	require('./post.handler')
];
