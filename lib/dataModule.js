
module.exports = class DataModule {
  constructor() {
    //pre-seed database with a classic
    this.movies = [{title: 'Ghost Busters', year: 1984}];
  }

  addMovie(movie, callback) {
    setTimeout(() => {
      var index;
      this.movies.forEach((m,i) => {
        if (m.title === movie.title) {
          index = i;
        }
      });
      if (index === undefined) {
        this.movies.push(movie);
        callback('Movie successfully added.');
      } else {
        callback('That movie is already in the database.');
      }
    }, 1000);
  }

  getAll(callback) {
    setTimeout(() => {
      if (this.movies.length > 0) {
        callback(JSON.stringify(this.movies));
      } else {
        callback('There are no movies in the database.');
      }
    }, 1000);
  }

  getOne(movie, callback) {
    setTimeout(() => {
      var selected = this.movies.filter(m => {
        return m.title === movie.title;
      });
      if (selected.length > 0) {
        callback(JSON.stringify(selected));
      } else {
        callback('Sorry that movie is not in the database.');
      }
    }, 1000);
  }

  deleteMovie(movie, callback) {
    setTimeout(() => {
      var index;
      this.movies.forEach((m,i) => {
        if (m.title === movie.title) {
          index = i;
        }
      });
      if (index === undefined) {
        callback('Movie not found.');
      } else {
        this.movies.splice(index, 1);
        callback('Movie successfully deleted.');
      }
    }, 1000);
  }

  changeMovie(oldMovie, newMovie, callback) {
    setTimeout(() => {
      var index;
      this.movies.forEach((m,i) => {
        if (m.title === oldMovie.title) {
          index = i;
        }
      });
      if (index === undefined) {
        callback('Movie not found.');
      } else {
        this.movies.splice(index, 1, newMovie);
        callback('Movie successfully updated.');
      }
    }, 1000);
  }
};
