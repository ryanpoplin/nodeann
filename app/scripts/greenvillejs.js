/**
*
* Quick Lesson Topics: 10 min...
* An Introduction to...
* JS Engine Scope Passes, Execution Context Objects, and Prototypes with Constructors...
* Some future ECMAScript hipsterish will be included also... 
*
*/

/**
*
* Shout Outs: The Iron Yard Academy, Mike Mikowski, MDN, Josh Powell...
* 
*/

/* Part One... */

// 1st Pass: function args are the boss...
// They can be optionally set a value before anything else in functional scope...
(function(the_boss) {

	// 1st Pass: console.log(the_boss) === 'The Boss'...

	// 1st Pass: local vars are all declared and initialized as 'undefined'...
	var 
		// this is redundant as it's not undefined...
		the_boss,
		proto_type, 
		test_object, 
		Constructor_Hacker, 
		constructor_hacker_one, 
		objectCreate,
		make_hacker,
		js_hacker, 
		http, 
		i, 
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
			// Hey, it's empty!
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
				// 
				console.log('Simple example...');
			}
			// the invocation of 'log_it' will create a new execution context...
			{
				// the new execution context...
				// access granted to the contexts it's nested within...
			}	
		}

	*/

	/* Part Two... */

	// our object framework...
	proto_type = {
		alias: 'Neck_Beard_0b10111',
		get_alias: function() {
			console.log('Your hacker alias is: ' + this.alias);
		},
		vendetta: 'Master Node...',
		get_vendetta: function() {
			console.log('Your vendetta is: ' + this.vendetta);
		}
	};

	test_object = {
		name: 'Test Object...'
	};

	// cross-browser method...
	Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  		obj.__proto__ = proto;
  		return obj; 
	};

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

	// alternative to using the 'new' keyword for instances...
	make_hacker = function(fav_lang) {
		var hacker;
		hacker = Object.create(proto_type);
		hacker.fav_lang = fav_lang;
		return hacker;
	}

	js_hacker = make_hacker('JavaScript');
	// console.log(js_hacker);
	// console.log(js_hacker.get_vendetta());

	http = require('http');
	urls = ['www.theironyard.com', 'www.naturalnews.com', 'www.youtube.com'];
	
	// Utilizing Object.create() in a free-form manner...
	// Hacker's still need aliases and vendettas!
	node_hacker = Object.create(proto_type);
	// Important stuff to know!
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

})('The Boss...');