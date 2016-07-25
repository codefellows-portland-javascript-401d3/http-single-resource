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
        assert.ok(result.data);
        testIds.push(result.data.id);
      })
      .catch( err => done(err) );
    fooStore
      .add({ name: 'foo1', value: '3.14159' })
      .then( result => {
        assert.ok(result.data);
        testIds.push(result.data.id);
        done();
      })
      .catch( err => done(err) );
  });

  after( () => {
    testIds.forEach( id => {
      fooStore
      .delete(id)
      .then( result => {
        testIds.splice(testIds.indexOf(result.id),1);
      })
      .catch( err => done(err) );
    });
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
        assert.equal(result.msg, 'success');
        assert(result.data.length > 1);
        done();
      })
      .catch( err => done(err) );
  });

  it('method get() with id returns chosen user', done => {
    fooStore
      .get(1)
      .then( result => {
        assert.equal(result.msg, 'success');
        assert.equal(result.data.name, 'foo1');
        done();
      })
      .catch( err => done(err) );
  });

  testUser = { name: 'foo3', security: 'low' };

  it('method add() completes successfully', done => {
    fooStore
      .add(testUser)
      .then( result => {
        testUser.id = result.data.id;
        assert.equal(result.msg, 'success');
        assert.equal(result.data.name, testUser.name);
      })
      .catch( err => done(err) )
      .then( () => {
        fooStore
          .get(testUser.id)
          .then( result => {
            assert.equal(result.msg, 'success');
            assert.equal(result.data.name, testUser.name);
            testUser = result.data;
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
        assert.equal(result.msg, 'success', result.text);
        assert.equal(result.data.name, testUser.name);
        fooStore
          .get(testUser.id)
          .then( result => {
            assert.equal(result.msg, 'success', result.text);
            assert.equal(result.data.name, testUser.name, result.text);
            done();
          })
          .catch( err => done(err) );
      })
      .catch( err => done(err) );
  });

});
