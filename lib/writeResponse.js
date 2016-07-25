function good(result, response){
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write(result);
  response.end();
}

function bad(error, response){
  response.writeHead(400, {'Content-Type': 'text/plain'});
  response.write(error);
  response.end();
}

exports.good = good;
exports.bad = bad;
