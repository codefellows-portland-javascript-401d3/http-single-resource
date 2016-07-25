const url = require('url');
const path = require('path');
const fs = require('fs');
const request = require('request');
const DataModule = require('./dataModule');

const data = new DataModule();

function onRequest (req, res) {
  let body = [];
  req.on('data', data => {
    body.push(data);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    const pathname = url.parse(req.url, true).pathname;
    if (pathname === '/') {
      home(req, res);
    } else if (/^\/movies/.test(pathname)) {
      movies(req, res, pathname, body);
    } else {
      console.log(`${pathname} could not be found`);
      sendMessage(res, '404 Error: Not Found', 404);
    }
  });
};

//will instruct users on how to interact with API
function home (req, res) {
  fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
};

//helper function
function pathToArray (string) {
  let newString = string.replace(/_/g, ' ');
  let stringArray = newString.split('/');
  return stringArray;
};

//helper function
function pathToObject (array) {
  const obj = {};
  if (array.length === 2) {
    return undefined;
  } else {
    obj.title = array[2];
  }
  return obj;
};

//helper function
function sendMessage (res, message, status) {
  res.writeHead(status, {'Content-Type': 'text/plain'});
  res.end(`${message}`);
}

//helper function
function sendData (res, material) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(material);
}

//GET, POST, PUT, and DELETE methods are supported
function movies (req, res, path, body) {
  if (body) {
    //using var is necessary here to get newBod out of this block scope
    var newBod = JSON.parse(body);
  }
  let pathArray = pathToArray(path);
  let movieObj = pathToObject(pathArray);

  if (req.method === 'GET') {
    if (movieObj) {
      data.getOne(movieObj)
        .then((selected) => {
          sendData(res, selected);
        }).catch((err) => {
          sendMessage(res, err, 404);
        });
    } else {
      data.getAll()
      .then((allMovies) => {
        sendData(res, allMovies);
      }).catch((err) => {
        sendMessage(res, err, 404);
      });
    }

  } else if (req.method === 'POST') {
    if (newBod) {
      data.addMovie(newBod)
        .then((message) => {
          sendMessage(res, message, 200);
        }).catch((err) => {
          sendMessage(res, err, 404);
        });
    } else {
      sendMessage(res, 'You must provide movie data to post.', 404);
    }

  } else if (req.method === 'PUT') {
    if (movieObj && newBod) {
      data.changeMovie(movieObj, newBod)
        .then((message) => {
          sendMessage(res, message, 200);
        }).catch((err) => {
          sendMessage(res, err, 404);
        });
    } else {
      sendMessage(res, 'You did not provide the required information.', 404);
    }

  } else if (req.method === 'DELETE') {
    if (movieObj) {
      data.deleteMovie(movieObj)
        .then((message) => {
          sendMessage(res, message, 200);
        }).catch((err) => {
          sendMessage(res, err, 404);
        });
    } else {
      sendMessage(res, 'You must provide a movie to delete.', 404);
    }

  } else {
    sendMessage(res, 'That HTTP verb is not supported here.', 404);
  }
};

module.exports.onRequest = onRequest;
