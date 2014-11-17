// app/v1/search/faceted/get.stub


/*
	(This may change later)
	
	For simplicity, I am only accepting POST to this route table space.
	This is the correct HTTP 1.1 response and Accept header combo.
	I include a human-readable message for "debuggability".
*/


module.exports = {
	verb: 'GET',
	path: '/*',
	handler: function(req, res) {
		res.setHeader('Allow', 'POST');
		res.statusCode = 405;
		res.json({
			message: '405 Invalid Method: Please use POST, ' +
				'as request bodies often RFC limitations on GET URL lengths.'
		});
	}
};
