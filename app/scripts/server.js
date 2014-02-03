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

	for(j=0;j<1;j++) {
		fetchPage('www.theironyard.com');
	}

})();