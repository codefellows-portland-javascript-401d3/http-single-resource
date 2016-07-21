// function one (response) {
//   console.log('request handler "one" was called.');
//
//   let body = '<html>' +
//     '<head>' +
//       '<meta charset="utf-8">' +
//       '<title>Page One</title>' +
//     '</head>' +
//     '<body>' +
//       '<h1>This is Page One</h1>' +
//       '<a href="/two"><h3>Click here to go to Page Two</h3></a>' +
//     '</body>' +
//   '</html>';
//
//   response.writeHead(200, {'Content-Type' : 'text/html'});
//   response.write(body);
//   response.end();
// }
//
// function two (response) {
//   console.log('request handler "two" was called.');
//
//   let body = '<html>' +
//       '<head>' +
//         '<meta charset="utf-8">' +
//         '<title>Page Two</title>' +
//       '</head>' +
//       '<body>' +
//         '<h1>This is Page Two</h1>' +
//         '<a href="/one"><h3>Click here to go to Page One</h3></a>' +
//       '</body>' +
//     '</html>';
//   response.writeHead(200, {'Content-Type' : 'text/html'});
//   response.write(body);
//   response.end();
// }
//
// exports.one = one;
// exports.two = two;
