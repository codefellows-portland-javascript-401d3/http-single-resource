const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../lib/server');

chai.use(chaiHttp);

describe('this api server', () => {

  const request = chai.request(server);
  let testIds = [];
  let testUser;

  before( done => {
    // Set up two test "users"
    request
      .post('/api/users')
      .send({ name: 'test-user0', security: 'low' })
      .end((err, res) => {
        testIds.push(JSON.parse(res.text).user.id);
        if (err) return done(err);
      });
    request
      .post('/api/users')
      .send({ name: 'test-user1', security: 'low' })
      .end((err, res) => {
        testIds.push(JSON.parse(res.text).user.id);
        if (err) return done(err);
        done();
      });
  });

  after( () => {
    testIds.forEach( id => {
      request
      .delete(`/api/users/${id}`)
      .end((err) => {
        if (err) return done(err);
        testIds.splice(testIds.indexOf(id),1);
      });
    });
  });

  it('returns 404 for bad path', done => {
    request
      .get('/badpath')
      .end((err, res) => {
        assert.ok(err);
        assert.equal(res.statusCode, 400);
        done();
      });
  });

  it('returns endpoint list on api root route', done => {
    request
      .get('/api')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.statusCode, 200);
        assert.equal(res.header['content-type'], 'application/json');
        assert.include(res.text, 'GET /api/users');
        done();
      });
  });

  it('/GET on user root returns list', done => {
    request
      .get('/api/users')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.statusCode, 200);
        assert.equal(res.header['content-type'], 'application/json');
        let result = JSON.parse(res.text);
        assert.equal(result.msg, 'success');
        assert(result.users.length > 0);
        done();
      });
  });

  it('/GET on user root with id returns chosen user', done => {
    request
      .get('/api/users/1')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.statusCode, 200);
        assert.equal(res.header['content-type'], 'application/json');
        let result = JSON.parse(res.text);
        assert.equal(result.msg, 'success');
        assert.equal(result.user.name, 'test-user1');
        done();
      });
  });

  describe('/POST method saves data that can be retrieved', () => {

    testUser = { name: 'test-user3', security: 'low' };

    it('/POST method completes successfully', done => {
      request
        .post('/api/users')
        .send(testUser)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.statusCode, 200);
          assert.equal(res.header['content-type'], 'application/json');
          let result = JSON.parse(res.text);
          testUser.id = result.user.id;
          assert.equal(result.msg, 'success');
          assert.equal(result.user.name, testUser.name);
          done();
        });
    });

    it('/GET on recently posted user returns correct user', done => {
      request
        .get(`/api/users/${testUser.id}`)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.statusCode, 200);
          assert.equal(res.header['content-type'], 'application/json');
          let result = JSON.parse(res.text);
          assert.equal(result.msg, 'success');
          assert.equal(result.user.name, testUser.name);
          testUser = result.user;
          done();
        });
    });

  });

  describe('/PUT method updates data already in storage', () => {

    it('/PUT method completes successfully', done => {
      testUser.name = 'test-put';
      request
        .put(`/api/users/${testUser.id}`)
        .send(testUser)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.statusCode, 200);
          assert.equal(res.header['content-type'], 'application/json');
          let result = JSON.parse(res.text);
          assert.equal(result.msg, 'success', res.text);
          assert.equal(result.user.name, testUser.name);
          done();
        });
    });

    it('/GET on recently updated user returns correct changes', done => {
      request
        .get(`/api/users/${testUser.id}`)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.statusCode, 200);
          assert.equal(res.header['content-type'], 'application/json');
          let result = JSON.parse(res.text);
          assert.equal(result.msg, 'success', res.text);
          assert.equal(result.user.name, testUser.name, res.text);
          done();
        });
    });

  });

  describe('/DELETE method removes data permenently', () => {

    it('/DELETE method removes user', done => {
      request
        .delete('/api/users/1')
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.statusCode, 200);
          assert.equal(res.header['content-type'], 'application/json');
          let result = JSON.parse(res.text);
          assert.equal(result.msg, 'success');
          done();
        });
    });

    it('/GET on recently deleted user returns fail message', done => {
      request
        .get('/api/users/1')
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.statusCode, 200);
          assert.equal(res.header['content-type'], 'application/json');
          let result = JSON.parse(res.text);
          assert.equal(result.msg, 'fail');
          done();
        });
    });

  });

});
