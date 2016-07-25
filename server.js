const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const formidable = require('formidable');
const util = require('util');
// const request = require('superagent');
const storage = require(`./lib/storage`);



module.exports = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  let regex = new RegExp(`/notes`);
  let method = req.method;

  if(!pathname.match(regex) && pathname !== `/`) {
    res.writeHead(200, {"Content-type": "text/html"});
    let content = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Data Storage</title>
      </head>
      <body>
        ERROR 404
      </body>
      </html>`;
    res.write(content);
    res.end();
  }
  
  if(pathname === `/`) {
    res.statusCode = 200;
    fs.readFile(`index.html`, (err, data) => {
      if(err) console.error(err);
      res.writeHead(200, {"Content-type": "text/html"});
      res.write(data, () => {
        res.end();
      });
    });

  } else if(pathname === `/notes` && method.toLowerCase() === `get`) {
    res.statusCode = 200;
    storage.get((storageArr) => {
      console.log(storageArr);
    });

  } else if(method.toLowerCase() === `get` && pathname.match(regex)) {
    console.log(`On to /notes/resources`);
    storage.getId(pathname, (note) => {
      console.log(note);
    });

  } else if(pathname === `/notes` && method.toLowerCase() === `post`) {
    console.log(`start of post`);
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write(`received upload\n`);
      res.end(util.inspect({fields}));
      storage.add(fields, (fields) => {
        console.log(fields);
      });
    }); 

  } else if (method.toLowerCase() === `delete`) {
    storage.del(pathname, (storageArr) => {
      console.log(`End of storage.del`);
    });
    res.end();
  
  } else if (method.toLowerCase() === `put` && pathname === `/notes`) {
    console.log(`start of put`);
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write(`received upload\n`);
      res.end(util.inspect({fields, files: files}));
      storage.put(pathname, fields, (fields) => {
        	  console.log(fields);
      });
    });
  }
});