var _ = require('underscore');
_.each([1,2,3], function(num) {
	console.log('underscore.js says ' + num);
});

var __ = require('lodash');
__.each([1,2,3], function(num) {
	console.log('lodash.js says ' + num);
});