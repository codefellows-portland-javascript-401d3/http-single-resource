const storage = require('../storage');
const url = require('url');

module.exports = function (request, response) {
  const requestedNote = storage.find((note) => {
    note.name = request.noteName;
  });
  // const requestedNote = true;

  if (request.noteName && requestedNote) {
    //Search the array of notes and return the one with the correct .name
    response.writeHead(200, {'Content-Type':'text/plain'});
    response.write(JSON.stringify(requestedNote));
    response.end();
  } else {
    //TODO: Refactor this to use Promises.all
    storage.forEach((note) => {
      response.writeHead(200, {'Content-Type':'text/plain'});
      // response.write('Note: ' + note.name + '\r\n' + note.content);
      response.write(JSON.stringify(note));
    });
  }
};
