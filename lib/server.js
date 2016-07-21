const http = require('http');
const url = require('url');

const storage = require('./storage');
const get = require('./operations/get');
const put = require('./operations/put');
const post = require('./operations/post');
const del = require('./operations/delete');

function onRequest (request, response) {
  // console.log(request.method);
  if (request.url.startsWith('/notes')) {
    console.log('Proper Request.');
    if(request.method === 'GET') get(request, response);
    if(request.method === 'POST') post(request, response);
    if(request.method === 'PUT') put(request, response);
    if(request.method === 'DELETE') del(request, response);

  } else {
    response.writeHead(400, {'Content-Type':'text/plain'});
    response.write('Improper Request URL');
    response.end();
  }
}

const server = http.createServer(onRequest);

module.exports = server;
