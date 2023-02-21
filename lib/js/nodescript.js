/*!
 * Encore
 * Author: Natski
 * MIT License
 */



/*
const http = require('http');

const req = http.request('http://natski.netlify.com', res => {
	const data = [];

	res.on('data', _ => data.push(_))
	res.on('end', () => console.log(data.join()))
});

req.end();
*/

const http = require('https');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`testng\nEncore N0.0.1 at\n${hostname}:${port}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});