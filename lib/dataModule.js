
module.exports = class DataModule {
  constructor() {
    //pre-seed database with a classic
    this.movies = [{title: 'Ghost Busters', year: 1984}];
  }

  addMovie(movie) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let index;
        this.movies.forEach((m,i) => {
          if (m.title === movie.title) {
            index = i;
          }
        });
        if (index === undefined) {
          this.movies.push(movie);
          resolve('Movie successfully added.');
        } else {
          reject('That movie is already in the database.');
        }
      }, 300);
    });
  }

  getAll () {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        if (this.movies.length > 0) {
          resolve(JSON.stringify(this.movies));
        } else {
          reject('There are no movies in the database.');
        }
      }, 300);
    });
  }

  getOne(movie) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        const selected = this.movies.filter(m => {
          return m.title === movie.title;
        });
        if (selected.length > 0) {
          resolve(JSON.stringify(selected));
        } else {
          reject('Sorry that movie is not in the database.');
        }
      }, 300);
    });
  }

  deleteMovie(movie) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        var index;
        this.movies.forEach((m,i) => {
          if (m.title === movie.title) {
            index = i;
          }
        });
        if (index === undefined) {
          reject('Movie not found.');
        } else {
          this.movies.splice(index, 1);
          resolve('Movie successfully deleted.');
        }
      }, 300);
    });
  }

  changeMovie(oldMovie, newMovie) {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        var index;
        this.movies.forEach((m,i) => {
          if (m.title === oldMovie.title) {
            index = i;
          }
        });
        if (index === undefined) {
          reject('Movie not found.');
        } else {
          this.movies.splice(index, 1, newMovie);
          resolve('Movie successfully updated.');
        }
      }, 300);
    });
  }

};
