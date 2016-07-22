const url = require('url');
const path = require('path');
const fs = require('fs');
const request = require('request');
const DataModule = require('./dataModule');

const data = new DataModule();

function onRequest (req, res) {
  var body = [];
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
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('404 Error: Not Found');
      res.end();
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

//GET, POST, PUT, and DELETE methods are supported
function movies (req, res, path, body) {
  if (body) {
    var newBod = JSON.parse(body);
  }
  let pathArray = pathToArray(path);
  let movieObj = pathToObject(pathArray);

  if (req.method === 'GET' && movieObj) {
    data.getOne(movieObj, (selected) => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(selected);
    });
  } else if (req.method === 'GET' && !movieObj) {
    data.getAll((allMovies) => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(allMovies);
    });
  } else if (req.method === 'POST' && newBod) {
    data.addMovie(newBod, (message) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(`<p>${message}</p>`);
    });
  } else if (req.method === 'POST' && !newBod) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<p>You must provide movie data to post.</p>');
  } else if (req.method === 'PUT' && movieObj && newBod) {
    data.changeMovie(movieObj, newBod, (message) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(`<p>${message}</p>`);
    });
  } else if (req.method === 'PUT' && (!movieObj || !newBod)) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<p>You must provide a movie to change.</p>');
  } else if (req.method === 'DELETE' && movieObj) {
    data.deleteMovie(movieObj, (message) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(`<p>${message}</p>`);
    });
  } else if (req.method === 'DELETE' && !movieObj) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<p>You must provide a movie to delete.</p>');
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<p>That HTTP verb is not supported here.</p>');
  }
};

module.exports.onRequest = onRequest;
