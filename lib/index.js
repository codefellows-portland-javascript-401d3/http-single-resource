const server = require('./server');
const PORT = 8888;

server.listen(PORT, () => {
  console.log('Server has started');
  console.log(`Server listening on http://localhost:${PORT}`);
});
