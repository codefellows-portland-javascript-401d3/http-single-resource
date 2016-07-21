const http = require('http');
const url = require('url');

const storage = require('./storage');
const get = require('./operations/get');
const put = require('./operations/put');
const post = require('./operations/post');
const del = require('./operations/delete');

function onRequest (request, response) {
  // console.log(request.method);
  console.log(request);
  if (request.url.startsWith('/notes')) {

    //Determine if the URL asks for a specific note.
    request.noteName = url.parse(request.url).pathname.split('/')[2];
    //And if it does, store a reference to the version in storage on the request obj.
    if (request.noteName) {
      request.requestedNote = storage.find((element, index, array) => {
        return element.name === request.noteName;
      });
    }

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
