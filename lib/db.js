var db = {};


db.create = function(){

};

db.readAll = function(resource, id, callback){
  var parsedID = parseInt(id);

  if((id === '/notes') || (id === '')){
    //return all items
    callback(JSON.stringify(resource));
  }
  else if((typeof parsedID) === 'number'){
    //get individual item
    db.readItem(resource, id, callback);
  }
  else {
    //error message
    callback('Resource not found.');
  }

};

db.readItem = function(resource, id, callback){
  var item = resource[id-1];

  if(resource.indexOf(item) !== -1){
    //return the item
    callback(JSON.stringify(resource[id-1]));
  } else {
    //error message
    callback('Resource not found.');
  }

};

db.update = function(){

};

db.delete = function(){

};

module.exports = db;
