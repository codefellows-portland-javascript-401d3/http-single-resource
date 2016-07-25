const Store = require('./store');
const userStore = new Store();

module.exports = (req,path,params,callback) => {

  if(path === '/api/users' && req.method === 'GET') {
    userStore.getAll()
    .then( users => {callback(users);});
  } else

  if(path.startsWith('/api/users/') && req.method === 'GET') {
    let id = parseInt(path.replace('/api/users/',''));
    userStore.get(id)
    .then( user => {
      callback(user);
    } );
  } else

  if(path === '/api/users' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const newUser = JSON.parse(body);
      userStore.add(newUser)
      .then( user => { callback(user); })
      .catch( err => { console.log(err);
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
      userStore.update(id, userUpdate)
      .then( user => {callback(user);});
    });
  } else

  if(path.startsWith('/api/users') && req.method === 'DELETE') {
    let id = parseInt(path.replace('/api/users/',''));
    userStore.delete(id)
    .then( data => {callback(data);});
  } else

  {
    // no path matches
    return callback({msg:'fail', path:path, params:params});
  }
};
