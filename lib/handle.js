const users = [];
let id_stack = 0;

module.exports = (req,path,params,callback) => {

  if(path === '/api/users' && req.method === 'GET') {
    let returnData = {msg:'success', users: users};
    fakeAsync()
    .then( () => {callback(returnData);});
  } else

  if(path.startsWith('/api/users/') && req.method === 'GET') {
    let id = parseInt(path.replace('/api/users/',''));
    let user;
    fakeAsync()
    .then( () => {
      let found = false;
      for (var i = 0; i < users.length; i++) {
        if(users[i].id === id) {
          user = users[i];
          found = true;
          break;
        }
      }
      if (found){
        callback({msg:'success', user: user});
      } else {
        callback({msg:'fail'});
      }
    });
  } else

  if(path === '/api/users' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const newUser = JSON.parse(body);
      fakeAsync()
      .then( () => {
        newUser['active'] = true;
        newUser['id'] = id_stack++;
        const index = users.push(newUser) - 1;
        callback({msg:'success', user: users[index]});
      });
    });
  } else

  if(path.startsWith('/api/users/') && req.method === 'PUT') {
    let id = parseInt(path.replace('/api/users/',''));
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const userUpdate = JSON.parse(body);
      fakeAsync()
      .then( () => {
        let found = false;
        for (var i = 0; i < users.length; i++) {
          if(users[i].id === id) {
            users[i] = userUpdate;
            found = true;
            break;
          }
        }
        if (found) {
          callback({msg:'success', user: users[i]});
        } else {
          callback({msg:'fail', user: body});
        }
      });
    });
  } else

  if(path.startsWith('/api/users') && req.method === 'DELETE') {
    let id = parseInt(path.replace('/api/users/',''));
    fakeAsync()
    .then( () => {
      let found = false;
      for (var i = 0; i < users.length; i++) {
        if(users[i].id === id) {
          user = users.splice(i,1);
          found = true;
          break;
        }
      }
      if (found) {
        return callback({msg:'success', user: user});
      } else {
        return callback({msg:'fail'});
      }
    });
  } else

  {
    return callback({msg:'fail', path:path, params:params});
  }
};

function fakeAsync() {
  return new Promise((resolve) => {
    setTimeout( () => {resolve();}, 50);
  });
};