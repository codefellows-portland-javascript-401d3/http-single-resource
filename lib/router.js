const url = require('url');
const path = require('path');
const fs = require('fs');
const request = require('request');
const DataModule = require('./DataModule');

const data = new DataModule();

const postOptions = {
  port: 8888,
  method: 'POST'
};

function onRequest (req, res) {
  const pathname = url.parse(req.url, true).pathname;
  const querystring = url.parse(req.url, true).query;
  if (pathname === '/movies/put') {req.method = 'PUT';};
  if (pathname === '/movies/post') {req.method = 'POST';};
  if (pathname === '/movies/delete') {req.method = 'DELETE';};
  if (pathname === '/movies' && isNotEmpty(querystring)) {req.method = 'POST';};

  if (typeof routeHandler[pathname] === 'function') {
    routeHandler[pathname](req, res);
  } else {
    console.log(`${pathname} could not be found`);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Error: Not Found');
    res.end();
  }
};

//helper function for query param
function isNotEmpty(object) {
  for(var key in object) {
    return true;
  }
  return false;
}

//will instruct users on how to interact with API
function home (req, res) {
  fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
};

//Only GET method supported at this path
//Either get all movies, or specify one movie to get
function movies (req, res) {
  const querystring = url.parse(req.url, true).query;
  if (req.method === 'GET' && isNotEmpty(querystring)) {
    data.getOne(querystring.title, () => {
      var selected = data.movies.filter(m => {
        return m.title === querystring.title;
      });
      if (selected.length > 0) {
        res.write(JSON.stringify(selected));
      } else {
        res.write('<p>Sorry that movie is not in the database.</p>');
      }
      res.end();
    });
  } else if (req.method === 'GET' && !isNotEmpty(querystring)) {
    data.getAll(() => {
      res.write(JSON.stringify(data.movies));
      res.end();
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('<p>That HTTP verb is not supported here.</p>');
    res.end();
  }
};

//POST new movie
function postMovies (req, res) {
  const querystring = url.parse(req.url, true).query;
  if (req.method === 'POST' && isNotEmpty(querystring)) {
    data.addMovie(querystring, () => {
      res.write('<p>Movie added successfully.');
      res.end();
    });
  } else if (req.method === 'POST' && !isNotEmpty(querystring)) {
    res.write('<p>You must provide movie data to post.</p>');
    res.end();
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('<p>That HTTP verb is not supported here.</p>');
    res.end();
  }
};

//PUT requests
//Switch out old movie with new movie
function putMovies (req, res) {
  const querystring = url.parse(req.url, true).query;
  if (req.method === 'PUT' && isNotEmpty(querystring)) {
    data.changeMovie(querystring, () => {
      res.write('<p>Movie successfully updated.</p>');
      res.end();
    });
  } else if (req.method === 'PUT' && !isNotEmpty(querystring)) {
    res.write('<p>You must provide a movie to change.</p>');
    res.end();
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('<p>That HTTP verb is not supported here.</p>');
    res.end();
  }
};

//DELETE requests
//Delete a movie from storage
function deleteMovies (req, res) {
  const querystring = url.parse(req.url, true).query;
  if (req.method === 'DELETE' && isNotEmpty(querystring)) {
    data.deleteMovie(querystring, () => {
      res.write('<p>Movie successfully deleted.</p>');
      res.end();
    });
  } else if (req.method === 'DELETE' && !isNotEmpty(querystring)) {
    res.write('<p>You must provide a movie to delete.</p>');
    res.end();
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('<p>That HTTP verb is not supported here.</p>');
    res.end();
  }
};

var routeHandler = {};
routeHandler['/'] = home;
routeHandler['/movies'] = movies;
routeHandler['/movies/post'] = postMovies;
routeHandler['/movies/put'] = putMovies;
routeHandler['/movies/delete'] = deleteMovies;

module.exports.onRequest = onRequest;
