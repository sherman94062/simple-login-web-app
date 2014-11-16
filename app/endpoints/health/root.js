// app/health/root


/*
	Various health and usage stats
*/


module.exports = [
	{
		verb: 'GET',
		path: '/',
		handler: require('./basic.stats')
	}
];
