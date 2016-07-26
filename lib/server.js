const http = require('http');
const url = require('url');
const querystring = require('querystring');
const handle = require('./handle');

const endpoints = {
  userList: 'GET /api/users',
  specificUser: 'GET /api/users/:id',
  addUser: 'POST /api/users',
  updateUser: 'PUT /api/users/:id',
  removeUser: 'DELETE /api/users/:id'
};

module.exports = http.createServer((req,res) => {
  const params = url.parse(req.url);
  const query = querystring.parse(params.query);

  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/api') {
    res.statusCode = 200;
    res.write(JSON.stringify(endpoints));
    res.end();
  } else

  // JSON request handler
  if (req.url.startsWith('/api')) {
    handle(req, params.path, query, (status,data) => {
      res.statusCode = status;
      const stringy = JSON.stringify(data);
      res.write(stringy);
      res.end();
    });
  } else

  // No paths found
  {
    res.statusCode = 400;
    res.end();
  }
});
