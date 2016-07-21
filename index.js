const server = require('./server/server');
// const router = require('./server/router');
// const handlers = require('./server/handlers');

const portNum = 8888;

server.listen(portNum, () => {
  console.log(`to open server, load 'localhost:${portNum}' in a browser window`);
});

// let handle = {};
//
// handle['/'] = handlers.one;
// handle['/one'] = handlers.one;
// handle['/two'] = handlers.two;

// server.start(router.route, handle);
