// app/endpoints/v1/root


/*
	All v1 API subspaces will be defined here.

	We may also include parent route information, or a listing endpoint.
*/


module.exports = {
	context: __dirname,
	children: [
		'search',
		'random',
		'metadata'
	]
};
