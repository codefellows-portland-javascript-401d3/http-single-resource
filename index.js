const server = require('./lib/server');

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('App is running on ' + port);
});