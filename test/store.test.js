const assert = require('chai').assert;
const Store = require('../lib/store');
const fooStore = new Store();

describe('data store async simulator', () => {

  let testIds = [];

  before( done => {
    // Set up two test "users"
    fooStore
      .add({ name: 'foo0', value: '42' })
      .then( result => {
        assert.equal(result.name, 'foo0');
        testIds.push(result.id);
      })
      .then( () => {
        fooStore
          .add({ name: 'foo1', value: '3.14159' })
          .then( result => {
            assert.equal(result.name, 'foo1');
            testIds.push(result.id);
            done();
          });
      })
      .catch( err => done(err) );
  });

  after( done => {
    let promises = [];
    testIds.forEach( id => {
      promises.push(
        fooStore
        .delete(id)
        .then( result => {
          testIds.splice(testIds.indexOf(result.id),1);
        })
      );
    });
    Promise.all(promises)
    .then( () => done() )
    .catch( err => done(err) );
  });

  it('returns error for bad id', done => {
    fooStore
      .get(42)
      .then( result => {
        assert(false, 'bad id should not succeed');
        done(result);
      })
      .catch( () => done() );
  });

  it('method getAll() returns list', done => {
    fooStore
      .getAll()
      .then( result => {
        assert(result.length > 1);
        done();
      })
      .catch( err => done(err) );
  });

  it('method get() with id returns chosen user', done => {
    fooStore
      .get(1)
      .then( result => {
        assert.equal(result.name, 'foo1');
        done();
      })
      .catch( err => done(err) );
  });

  testUser = { name: 'foo3', security: 'low' };

  it('method add() completes successfully', done => {
    fooStore
      .add(testUser)
      .then( result => {
        testUser.id = result.id;
        assert.equal(result.name, testUser.name);
      })
      .catch( err => done(err) )
      .then( () => {
        fooStore
          .get(testUser.id)
          .then( result => {
            assert.equal(result.name, testUser.name);
            testUser = result;
            done();
          })
          .catch( err => done(err) );
      });
  });

  it('method update() completes successfully', done => {
    testUser.name = 'test-put';
    fooStore
      .update(testUser.id, testUser)
      .then( result => {
        assert.equal(result.name, testUser.name);
      })
      .then( () => {
        fooStore
          .get(testUser.id)
          .then( result => {
            assert.equal(result.name, testUser.name, result);
            done();
          });
      })
      .catch( err => done(err) );
  });

});
