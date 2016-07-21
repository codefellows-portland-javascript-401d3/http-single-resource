const http = require('http');
const router = require('./router');

const PORT = 8888;

const server = http.createServer(router.onRequest);

module.exports = server;
