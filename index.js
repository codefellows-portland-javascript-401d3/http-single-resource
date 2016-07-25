const server = require('./lib/server');

server.listen('8000', ()=>{
  console.log('server started on ', server.address().port);
});
