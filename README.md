#A simple http-datastore

##Codefellows 401d3

###Aaron Bini - 07/20/2016

###Routes

GET to "/movies" to get all movies currently in the movie storage. There is one movie pre-saved.

GET to "/movies/title", where 'title' is the movie you're searching for in order to retrieve a single movie from storage.

POST to "/movies" => Send JSON in request body like this: {title: [movie title], year: [year]} for the movie you'd like to add to storage.

PUT to "/movies/oldtitle" to replace 'oldtitle' with new movie sent as JSON in request body as specified above.

DELETE to "/movies/title" to delete 'title' from storage.

Spaces in movie titles specified in URL should be replaced with an underscore. At the moment all requests are case-sensitive.


Not all routes will support each of these methods. If a method is not supported, the user will be made aware with a message.
