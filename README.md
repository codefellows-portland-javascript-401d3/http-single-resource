#A simple http-datastore

##Codefellows 401d3

###Aaron Bini - 07/20/2016

###Routes

=> GET - A 'get' request sent to the 'home' route will return a list of all resources saved thus far.

=> POST - A 'post' request will save the 'post' body to in-memory storage.

=> PUT - A 'put' request will replace the named resource that the request is being sent to.

=> DELETE - A 'delete' request will deleted the named resource that the request is being sent to.


Not all routes will support each of these methods. If a method is not supported, the user should be made aware (with 400 status code).

Also, verbs that are missing expected arguments should respond with a 400 status code.
