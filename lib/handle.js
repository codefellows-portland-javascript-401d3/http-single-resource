const fs = require('fs');

const users = [];
let id_stack = 0;

module.exports = (req,path,params,callback) => {

  if(path === '/api/users' && req.method === 'GET') {
    return callback({msg:'success', users: users});      
  }

  if(path === '/api/users' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const newUser = JSON.parse(body);
      newUser['active'] = true;
      newUser['id'] = id_stack++;
      const index = users.push(newUser) - 1;
      return callback({msg:'success', user: users[index]});      
    });
  }

  // console.log('method',method);
  // console.log('path',path);
  // console.log('params',params);
  
};