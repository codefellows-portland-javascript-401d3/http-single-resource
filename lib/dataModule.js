

module.exports = class DataModule {
  constructor() {
    this.movies = [{title: 'Ghost Busters', year: 1989}];
    /*{
        title: 'Ghost Busters',
        year: 1991
      }*/
  }

  addMovie(movie, callback) {
    //if movie is in database return error
    setTimeout(() => {
      this.movies.push(movie);
      callback();
    }, 1000);
  }

  getAll(callback) {
    //if no movies return message
    setTimeout(() => {
      callback();
    }, 1000);

  }

  getOne(title, callback) {
    //if movie is not in database return error
    setTimeout(() => {
      callback();
    }, 1000);
  }

  deleteMovie(movie, callback) {
    //if movie is not in database return error
    setTimeout(() => {
      var index;
      this.movies.forEach((m,i) => {
        if (m.title === movie.title) {
          index = i;
        }
      });
      this.movies.splice(index, 1);
      callback();
    }, 1000);
  }

  changeMovie(movie, callback) {
    //if movie is not in database return error
    setTimeout(() => {
      var index;
      var newMovie = {};
      newMovie.title = movie.title;
      newMovie.year = movie.year;
      this.movies.forEach((m,i) => {
        if (m.title === movie.oldtitle) {
          index = i;
        }
      });
      this.movies.splice(index, 1, newMovie);
      callback();
    }, 1000);
  }
};
