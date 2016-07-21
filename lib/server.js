const http = require('http');
const url = require('url');
const storage = require('./storage');

function onRequest (request, response) {

}

const server = http.createServer(onRequest);

module.exports = server;
