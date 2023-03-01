/*!
 * Encore
 * Author: Natski
 * MIT License
 */


/*
const http = require('http');

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
*/
/*

const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://mangabuddy.com/popular';

rp(url)
  .then(function(html){
    //success!
    const mangaURL = [];
    for (let i = 0; i < 45; i++) {
      mangaURL.push($('h3 > a', html)[i].attribs.href);
    }
    console.log(mangaURL);
  })
  .catch(function(err){
    //handle error
  });

*/