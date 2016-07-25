const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const dataStore = require('../lib/dataModule');

const data2 = new dataStore();

describe('data storage module', () => {

  it('gets all stored items', (done) => {
    data2.getAll(data2.movies).then((movies) => {
      assert.deepEqual('[{"title":"Ghost Busters","year":1984}]', movies);
      done();
    });
  });

  it('gets one stored item', (done) => {
    data2.getOne({title: 'Ghost Busters'}).then((movie) => {
      assert.deepEqual('[{"title":"Ghost Busters","year":1984}]', movie);
      done();
    });
  });

  it('errors when the GET request yields no item', (done) => {
    data2.movies.splice(0,1);
    data2.getOne({title: 'Ghost Busters'}).catch((err) => {
      assert.isOk(data2.movies.length === 0);
      assert.deepEqual('Sorry that movie is not in the database.', err);
      done();
    });
  });

  it('adds a new item', (done) => {
    data2.addMovie({title: 'The Godfather', year: 1973}).then((message) => {
      assert.isOk(data2.movies.length === 1);
      assert.deepEqual('Movie successfully added.', message);
      done();
    });
  });

  it('errors when user tries to add item already in database', (done) => {
    data2.addMovie({title: 'The Godfather', year: 1973}).catch((err) => {
      assert.deepEqual('That movie is already in the database.', err);
      done();
    });
  });

  it('replaces an item with a new item', (done) => {
    data2.changeMovie({title: 'The Godfather'}, {title: 'The Catfather', year: 2016})
      .then((message) => {
        assert.isOk(data2.movies.length === 1);
        assert.deepEqual('Movie successfully updated.', message);
        done();
      });
  });

  it('errors when the PUT request item to replace is not found', (done) => {
    data2.changeMovie({title: 'The Godfather'}, {title: 'Raising Arizona', year: 1987}).catch((err) => {
      assert.deepEqual('Movie not found.', err);
      done();
    });
  });

  it('deletes an item', (done) => {
    data2.deleteMovie({title: 'The Catfather'}).then((message) => {
      assert.isOk(data2.movies.length === 0);
      assert.deepEqual('Movie successfully deleted.', message);
      done();
    });
  });

  it('errors when the DELETE request item to be deleted is not found', (done) => {
    data2.deleteMovie({title: 'The Catfather'}).catch((err) => {
      assert.deepEqual('Movie not found.', err);
      done();
    });
  });
});
