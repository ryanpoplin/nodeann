/*var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Node.js is coming for you...');
}).listen(5555, '127.0.0.1');
console.log('Server running at http://127.0.0.1:5555/');*/

(function() {

	var http, urls, i, j;
	
	http = require('http');
	urls = ['www.google.com', 'www.theironyard.com', 'www.youtube.com', 'www.gamemaster-inc.com', 'www.lightningservers.net'];
	
	function fetchPage(url) {
		var start;
		start = new Date();
		http.get({host:url},function(res) {
			console.log('Got response from: ' + url);
			console.log('Request took: ', new Date() - start, ' ms');
		});
	}
	
	/*for(i=0;i<urls.length;i++) {
		fetchPage(urls[i]);
	}*/

	/*for(j=0;j<5;j++) {
		fetchPage('www.theironyard.com');
	}*/

})();

// So what is 'this'...
(function() {
	var what_is_it, make_hacker, node_hacker, proto_type, js_hacker, js_hacker_instance;
	// console.log(this);
	what_is_it = function() {
		var what_is_it;
		// console.log(this);
		what_is_it = function() {
			// console.log(this);
		};
	};
	/*proto_type = {
		name: 'This is a prototype...'
	};*/
	make_hacker = function(alias) {
		// console.log(this);
		var hacker;
		// A prototype object is req. with Object.create(); ?... 
		hacker = Object.create(null);
		hacker.alias = alias;
		return hacker;
		console.log(this);
	};
	node_hacker = make_hacker('Nihilus');
	// console.log(node_hacker);
	js_hacker = function(alias) {
		console.log(this);
		this.alias = alias;
	};
	js_hacker_instance = new js_hacker('Nihilus');
	// console.log(js_hacker_instance);
})();

(function() {
	var event_emitter,
		Counter,
		counter,
		callback;
	event_emitter = require('events').EventEmitter;
	Counter = function(init) {
		// console.log(this);
		this.increment = function() {
			init += 1;
			// console.log(this);
			this.emit('incremented', init);
		};
	};
	Counter.prototype = new event_emitter();
	counter = new Counter(23);
	callback = function(count) {
		console.log(count);
	};
	counter.on('incremented', callback);
	counter.increment();
	counter.increment();
	counter.removeListener('incremented', callback);
	counter.increment();
})();