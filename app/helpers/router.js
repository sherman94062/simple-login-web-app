// app/helpers/router


/*
	Helper constructs router heirachies from a manifest.

	(1) Creates an Express.js router
	(2) Loops over route declarations
		(a) Forces Array type route declarations to Object
		(b) Normalizes into plurals for `paths` and `verbs`
		(c) Applies each permutation with the supplied handler.
	(3) Loads and registers each of child spaces within context.
	(4) Return constructed router.

	Expected format: {
		context: string for directory hosting mount point,
		children: Array of strings for subspace names
		routes: [
			...,
			{
				handler: callback to handle traffic

				verb: string for http verb name
				// OR
				verbs: Array of string for http verbs

				path: string or RegExp for relative route
				// OR
				paths: Array of string or RegExp for relative route

				acceptParams: Object containing allowed query params and validation code
				  for composing into a prepacked string.
				Accepts values of functions, strings or RegExps, or arrays of these types.
				  example:
				    acceptParams: {size: /\d+/, include: ['true', 'false']}
				    // the request
				    <path>/?size=10&garbage=value&include=true
				    // in the handler...
				    req.preppedQuery; // ?size=10&include=true
			}
			...
		]
	}
*/


var express = require('express');

var exportable = {
	generate: function (subspace) {
		// (1) New Express.js router
		var router = express.Router();


		// (2) Looping over route table
		// (2a) Coerce argument to an object if no children
		if (Array.isArray(subspace)) {
			subspace = {
				routes: subspace
			};
		}

		(subspace.routes || []).forEach(function(route) {
			var routeConfig = {
				handler: route.handler
			};

			// (2b) Normalizing to pluralized versions in Arrays
			routeConfig.verbs = route.verbs || [route.verb];
			routeConfig.paths = route.paths || [route.path];

			// (2c) Apply routing for each entry in pluralized
			routeConfig.paths.forEach(function(path) {
				routeConfig.verbs.forEach(function(verb) {
					router[verb.toLowerCase()](path, function(req) {
						req.preppedQuery = routeConfig.acceptParams
							? prepQueryString(routeConfig.acceptParams, req.query)
							: '';
						routeConfig.handler.apply(null, [].slice.call(arguments), 0);
					});
				});
			});
		});

		// (3) Load child spaces within context of this route
		if (Array.isArray(subspace.children) && typeof subspace.context === 'string') {
			subspace.children.forEach(function(childName) {
				router.use('/' + childName, exportable.generate(require([
					subspace.context,
					childName,
					'root'
				].join('/'))));
			});
		}

		// (4) Expose the router
		return router;

	}
};

function accepts(value) {
	return function(validator) {
		switch (typeof validator) {
			case 'function':
				return validator(value);
			// RegExp
			case 'object':
				return validator.text && validator.test(value);
			case 'string':
				return value === validator;
		}
	}
}

function prepQueryString(validatorSet, queryParams) {
	return Object.keys(validatorSet).reduce(function(queryString, key) {

		if (queryParams[key] && Array.isArray(validatorSet[key])
			? validatorSet[key].some(accepts(queryParams[key]))
			: accepts(queryParams[key])(validatorSet[key])) {

				queryString += [
					key,
					queryParams[key]
				].join('=');

		}

		return queryString;

	}, '');
}

module.exports = exportable;
