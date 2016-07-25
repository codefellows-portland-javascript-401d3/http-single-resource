var writeResponse = require('./writeResponse');
var db = require('./db');

module.exports = function(request, response){

  const requestURL = request.url.split('/');
  const category = requestURL[1];
  const id = requestURL[2];

  if(requestURL.length === 2){
    db.fetchAll(category, (error, result)=>{
      if(error){
        writeResponse.bad(error, response);
      } else {
        writeResponse.good(result, response);
      }
    });
  }
  else if(requestURL.length === 3){
    db.fetchItem(category, id, (error, result)=>{
      if(error){
        writeResponse.bad(error, response);
      } else {
        writeResponse.good(result, response);
      }
    });
  }
  else {
    writeResponse.bad('Resource not found', response);
  }

};
