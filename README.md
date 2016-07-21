#A simple http-datastore

##Codefellows 401d3

###Aaron Bini - 07/20/2016

###Routes

Enter "/movies" to get all movies currently in the movie storage. There is one movie pre-saved.

Enter "/movies?title=[title of movie you would like to retrieve]" to retrieve a movie from storage.

Enter "/movies/post?title=[movie title]&year=[movie year]" to add to the movie storage.

Enter "/movies/put?oldtitle=[title of movie you want to change]&title=[new title]&year=[new year]" to change a movie in storage.

Enter "/movies/delete?title=[movie you would like to delete]" to delete a movie from storage.


Not all routes will support each of these methods. If a method is not supported, the user will be made aware with a message.
