/**
*
* Quick Lesson: 10 min...
* An Introduction to...
* JS Engine Scope Passes, Execution Context Objects, and Prototypes with Constructors...
* Some future ECMAScript hipsterisms will be included also... 
*
*/

/**
*
* Shout Outs: The Iron Yard Academy, Mike Mikowski, MDN, Josh Powell...
* 
*/

/* Part One... */

// 1st Pass: function args are the boss...
// They can be set to a value before anything else in functional scope...
(function(the_boss, execution) {

	// console.log(the_boss, execution, proto_type);
	// logs: The Boss is... 37 undefined

	// 1st Pass: local vars are all declared and initialized as 'undefined'...
	var 
		// this is redundant as it's not undefined...
		the_boss,
		execution,
		obj_obj,
		proto_type, 
		test_object, 
		Constructor_Hacker, 
		constructor_hacker_one, 
		objectCreate,
		make_hacker,
		js_hacker, 
		http, 
		i, 
		j,
		node_hacker, 
		urls;

	js_hacker = 'Temp. string...';

	function log_it() {
		console.log('Simple example...');
	}

	// an empty 'execution context object' is created on invocation...
	// this will create a new execution context inside of the current one...
	// log_it();

	/*
	
		// First Pass:
	
		{
			// Hey, it's the empty execution context object!
		}
	
		{
			the_boss: 'The Boss...'
		}
	
		{
			the_boss: 'The Boss...',
			js_hacker: undefined,
		}
	
		{
			the_boss: 'The Boss...',
			js_hacker: undefined,
			log_it: function() {
				// not exec. yet...
				console.log('Simple example...');
			}
		}

	*/

	/*
	
		// Second Pass:

		{
			the_boss: 'The Boss...',
			js_hacker: 'Temp. string...',
			log_it: function() {
				// the invocation of 'log_it' will create a new execution context...
				// the new execution context...
				{{ 
				console.log('Simple example...');
					// access granted to the contexts it's nested within...
				}}	
			}
		}

	*/

	/* Part Two... */

	// our prototype object framework...
	proto_type = {
		alias: 'Neck_Beard_0b10111',
		get_alias: function() {
			console.log('Your hacker alias is: ' + this.alias);
		},
		vendetta: 'Master a language and its environment/s...',
		get_vendetta: function() {
			console.log('Your vendetta is: ' + this.vendetta);
		}
	};

	test_object = {
		name: 'Test Object...'
	};

	// cross-browser method...
	Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  		// not more __proto__ syntax...
  		obj.__proto__ = proto;
  		return obj; 
	};

	// 
	Object.setPrototypeOf(test_object, proto_type);
	// console.log(Object.getPrototypeOf(test_object));

	Constructor_Hacker = function(alias) {
		this.alias = alias;
	};

	Constructor_Hacker.prototype = proto_type;

	constructor_hacker_one = new Constructor_Hacker('Nihilus');
	// console.log(constructor_hacker_one);
	// console.log(constructor_hacker_one.get_alias());

	// cross-browser method...
	objectCreate = function(arg) {
  		if (!arg) { return {}; }
  		function obj() {};
  		obj.prototype = arg;
  		return new obj;
	};
	Object.create = Object.create || objectCreate;

	obj_obj = {};
	// {}
	// console.log(obj_obj);
	// {}
	// console.log(obj_obj.__proto__);
	// null...
	// console.log(obj_obj.__proto__.__proto__);
	// Runtime Error...
	// console.log(obj_obj.__proto__.__proto__.__proto__);

	// an alternative to using the 'new' keyword for instances...
	make_hacker = function(ur_alias, fav_lang) {
		var hacker;
		hacker = Object.create(proto_type);
		// all is good even though i didn't pass in or set 'ur_alias'...
		hacker.fav_lang = fav_lang;
		return hacker;
	}

	js_hacker = make_hacker('JavaScript');
	// console.log(js_hacker);
	console.log(js_hacker.get_alias());
	// console.log(js_hacker.get_vendetta());

	// proto_type...
	// console.log(js_hacker.__proto__);
	// {}...
	// console.log(js_hacker.__proto__.__proto__);
	// null...
	// console.log(js_hacker.__proto__.__proto__.__proto__);
	// Runtime Error...
	// console.log(js_hacker.__proto__.__proto__.__proto__.__proto__);

	http = require('http');
	urls = ['www.theironyard.com', 'www.naturalnews.com', 'www.youtube.com'];
	
	// Utilizing Object.create() real quick...
	// Hacker's still need aliases and vendettas!
	node_hacker = Object.create(proto_type);
	node_hacker.wait_in_ms = 'milliseconds utilizing Node...';
	node_hacker.wait_in_s = 'seconds utilizing Node...';
	node_hacker.wait_in_s_con = function(ms) {
		var seconds;
		seconds = ms / 1000;
		return seconds;
	};

	function fetchPage(url) {
		var start;
		start = new Date();
		http.get({ host: url }, function(res) {
			console.log('Got response from: ' + url);
			console.log('Request took: ', new Date() - start, node_hacker.wait_in_ms);
			console.log('Request took: ', node_hacker.wait_in_s_con(new Date() - start), node_hacker.wait_in_s);
		});
	}

	for (i = 0; i < urls.length; i += 1) {
		fetchPage(urls[i]);
	}

})('The Boss is...', (20 + 20) - 3);