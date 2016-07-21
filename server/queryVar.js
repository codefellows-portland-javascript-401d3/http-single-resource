module.exports = function getQueryVariable(queryString, variable) {
  var vars = queryString.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1].toLowerCase().replace('%20', ' ');
    }
  }
  return true;
};
