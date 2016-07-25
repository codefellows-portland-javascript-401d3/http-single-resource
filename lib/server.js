const http = require('http');
const routeGetRequest = require('./routeGetRequest');
const writeResponse = require('./writeResponse');

module.exports = http.createServer((request, response)=>{

  if(request.method === 'GET'){
    routeGetRequest(request, response);
  } else {
    writeResponse.bad('Resource not found', response);
  }

});
