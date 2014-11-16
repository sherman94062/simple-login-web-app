// server


/*
	Contains base launch and filesystem logic.

	(1) `appRoot` relative `require` path alias
	(2) Setup a speedy method for helper access
	(3) Setup global access to a frozen service configuration object.
	(4) Launch!
*/


// (1) `appRoot` alias to allow relative inclusion from /app
GLOBAL.appRoot = function(relativePath) {
	return require('./app/' + relativePath);
}

// (2) Speedy `helper` method for access anywhere
GLOBAL.helper = function(helperName) {
	return appRoot('helpers/' + helperName);
};

// (3) Global access to frozen configs
GLOBAL.serviceConfigs = require('./app/configuration/full');

// (4) Go!
require('./app/launch');
