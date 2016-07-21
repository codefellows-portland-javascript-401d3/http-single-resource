const fs = require('fs');

const users = [];
let id_stack = 0;

module.exports = (req,path,params,callback) => {

  if(path === '/api/users' && req.method === 'GET') {
    return callback({msg:'success', users: users});      
  } else

  if(path.startsWith('/api/users/') && req.method === 'GET') {
    let id = parseInt(path.replace('/api/users/',''));
    let user;
    for (var i = 0; i < users.length; i++) {
      if(users[i].id === id) {
        user = users[i];
        return callback({msg:'success', user: user});
      }
    }  
    return callback({msg:'fail'});
  } else

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
  } else

  // console.log('method',method);
  // console.log('path',path);
  // console.log('params',params);
  {
    return callback({msg:'fail'});
  }
};