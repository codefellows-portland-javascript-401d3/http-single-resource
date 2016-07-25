const data = require('../data');

const db = {};

db.fetchAll = function(category, callback){
  if(data[category]){
    callback(null, JSON.stringify(data[category]));
  } else {
    callback('Resource not found');
  }
};

db.fetchItem = function(resource, id, callback){
  const category = data[resource];

  if(category){
    if(category[id-1]){
      callback(null, JSON.stringify(category[id-1]));
    } else {
      callback('Resource not found.');
    }
  } else {
    callback('Resource not found.');
  }
};

module.exports = db;
