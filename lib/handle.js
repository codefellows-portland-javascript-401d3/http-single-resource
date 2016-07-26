const Store = require('./store');
const userStore = new Store();

module.exports = (req,path,params,callback) => {

  if(path === '/api/users' && req.method === 'GET') {
    userStore.getAll()
    .then( users => { callback(200, users); })
    .catch( err => { callback(400, err); });
  } else

  if(path.startsWith('/api/users/') && req.method === 'GET') {
    let id = parseInt(path.replace('/api/users/',''));
    userStore.get(id)
    .then( user => { callback(200, user); })
    .catch( err => { callback(400, err); });
  } else

  if(path === '/api/users' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const newUser = JSON.parse(body);
      userStore.add(newUser)
      .then( user => { callback(200, user); })
      .catch( err => { callback(400, err); });
    });
  } else

  if(path.startsWith('/api/users/') && req.method === 'PUT') {
    let id = parseInt(path.replace('/api/users/',''));
    if (id != 0 && !id) return callback(400, {msg:'no id', path:path, params:params});
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const userUpdate = JSON.parse(body);
      userStore.update(id, userUpdate)
      .then( user => { callback(200, user); })
      .catch( err => { callback(400, err); });
    });
  } else

  if(path.startsWith('/api/users') && req.method === 'DELETE') {
    let id = parseInt(path.replace('/api/users/',''));
    userStore.delete(id)
    .then( data => { callback(200, data); })
    .catch( err => { callback(400, err); });
  } else

  {
    // no path matches
    return callback(400,{msg:'bad path', path:path, params:params});
  }
};
