const server = require('./server');

server.listen(8888, () => {
  console.log('Server has started');
  console.log(`Server listening on http://localhost:${PORT}`);
});
