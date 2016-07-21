const http = require('http');
const url = require('url');

const storage = require('./storage');
const get = require('./operations/get');
const put = require('./operations/put');
const post = require('./operations/post');
const del = require('./operations/delete');

function onRequest (request, response) {
  console.log(request.method);
  if (request.url.startsWith('/notes')) {
    console.log('Proper Request.');
    if(request.method === 'GET') get(response);
    if(request.method === 'POST') post(response);
    if(request.method === 'PUT') put(response);
    if(request.method === 'DELETE') del(response);

  } else {
    response.writeHead(400, {'Content-Type':'text/plain'});
    response.write('Improper Request URL');
    response.end();
  }
}

const server = http.createServer(onRequest);

module.exports = server;
