var http = require('http');
var port = process.env.PORT || 3000;

var server = http.createServer(function(req, res) {
res.end('Hello World\n'); }).listen(port);

console.log('Server is running on port ' + port);