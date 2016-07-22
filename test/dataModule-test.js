const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const dataStore = require('../lib/DataModule');

const data2 = new dataStore();

describe('data storage module', function() {

  it('gets all stored items', function (done) {
    data2.getAll(function(movies) {
      assert.deepEqual('[{"title":"Ghost Busters","year":1984}]', movies);
      done();
    });
  });

  it('gets one stored item', function (done) {
    data2.getOne({title: 'Ghost Busters'},function(movie) {
      assert.deepEqual('[{"title":"Ghost Busters","year":1984}]', movie);
      done();
    });

  });

  it('adds a new item', function (done) {
    data2.addMovie({title: 'The Godfather', year: 1973}, function(message) {
      assert.ok(data2.movies.length === 2);
      assert.deepEqual('Movie successfully added.', message);
      done();
    });

  });

  it('replaces an item with a new item', function (done) {
    data2.changeMovie({title: 'The Godfather'}, {title: 'The Catfather', year: 2016}, function(message) {
      assert.ok(data2.movies.length === 2);
      assert.deepEqual('Movie successfully updated.', message);
    });
    done();
  });

  it('deletes an item', function (done) {
    data2.deleteMovie({title: 'The Catfather'}, function(message) {
      assert.ok(data2.movies.length === 1);
      assert.deepEqual('Movie successfully deleted.', message);
    });
    done();
  });

  after(function (done) {
    data2.movies = [{title: 'Ghost Busters', year: 1984}];
    done();
  });
});
