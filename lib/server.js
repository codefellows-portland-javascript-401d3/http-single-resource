var http = require('http');
var db = require('./db');
var data = require('../data');

module.exports = http.createServer((request, response)=>{

  if((request.url).startsWith('/notes')){

    if(request.method === 'GET'){

      var id = (request.url).replace('/notes/', '');
      
      db.readAll(data.notes, id, (result)=>{
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(result);
        response.end();
      });

    }
  } else {
    //error message for invalid URLs
    response.writeHead(400, {'Content-Type': 'text/plain'});
    response.write('Page not found');
    response.end();
  }
});
