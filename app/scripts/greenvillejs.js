(function() {

	var proto_type, Class_Hacker, class_hacker_one, class_hacker_two, test_object, js_hacker, http, i, j,node_hacker, urls;

	// a prototype...
	proto_type = {
		alias: 'Neck_Beard_001110',
		get_alias: function() {
			console.log('Your hacker alias is: ' + this.alias);
		},
		vendetta: 'Get damn good at Node...',
		get_vendetta: function() {
			console.log('Your vendetta is: ' + this.vendetta);
		}
	};

	// a testing object...
	test_object = {
		alias: 'Test Object...'
	};

	// No more .__proto__ syntax...
	Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  		obj.__proto__ = proto;
  		return obj; 
	};

	// 'test_object' prototype linkage...
	Object.setPrototypeOf(test_object, proto_type);
	/*console.log(test_object);
	console.log(Object.getPrototypeOf(test_object));*/

	// a class-like constructor function...
	Class_Hacker = function(alias) {
		this.alias = alias;
	};

	// Why .prototype for constructors?
	// constructor prototype linkage...
	Class_Hacker.prototype = proto_type;

	// instantiate...
	class_hacker_one = new Class_Hacker('Class_Based_Nihilus');

	// logging...
	/*console.log(class_hacker_one);
	console.log(class_hacker_one.alias);
	console.log(class_hacker_one.get_alias());*/

	// instantiate...
	class_hacker_two = new Class_Hacker();

	// logging...
	/*console.log(class_hacker_two);
	console.log(Object.getPrototypeOf(class_hacker_two).alias);
	console.log(Object.getPrototypeOf(class_hacker_two).get_alias());*/

	// a prototype leading the way... 
	js_hacker = Object.create(proto_type);
	js_hacker.alias = 'No_Need_For_An_Alias';
	js_hacker.abstraction = 'CoffeeScript';

	/*console.log(js_hacker);
	console.log(js_hacker.alias);
	console.log(js_hacker.abstraction);
	console.log(js_hacker.get_alias());*/

	// A little node app...

	http = require('http');
	urls = ['www.theironyard.com', 'www.naturalnews.com', 'www.youtube.com'];
	
	// Hacker's still need aliases and vendettas!
	node_hacker = Object.create(proto_type);
	// Important stuff to know!
	node_hacker.wait_in_ms = 'milliseconds utilizing Node...';
	node_hacker.wait_in_s = 'seconds utilizing Node...';
	node_hacker.wait_in_s_con = function(ms) {
		var seconds;
		seconds = (ms / 1000) % 60;
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
		for (j = 0; j < 4; j += 1) {
			fetchPage(urls[i]);
		}
	}

})();