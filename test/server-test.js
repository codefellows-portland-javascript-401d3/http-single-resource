const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const chaiHttp = require('chai-http');
const server = require('../lib/server');

chai.use(chaiHttp);
const req = chai.request(server);

describe('http-server-routes and http verbs testing', function () {
  it('serves up homepage', function (done) {
    req.get('/')
      .end(function(err, res) {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Simple Movie Storage');
        done();
      });
  });

  it('GETS all movies', function (done) {
    req.get('/movies')
      .end(function(err, res) {
        if (err) return done(err);
        assert.deepEqual('application/json', res.headers['content-type']);
        expect(res).to.have.status(200);
        assert.deepEqual('[{"title":"Ghost Busters","year":1984}]', res.text);
        done();
      });
  });

  it('GETS one movie', function (done) {
    req.get('/movies/Ghost_Busters')
      .end(function(err, res) {
        if (err) return done(err);
        assert.deepEqual('application/json', res.headers['content-type']);
        expect(res).to.have.status(200);
        assert.deepEqual('[{"title":"Ghost Busters","year":1984}]', res.text);
        done();
      });
  });

  it('POSTS a movie', function (done) {
    req.post('/movies')
      .send({title: 'A Few Good Men', year: 1990})
      .end(function(err, res) {
        if (err) return done(err);
        assert.deepEqual('text/plain', res.headers['content-type']);
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Movie successfully added.');
        done();
      });
  });

  it('replaces one movie with PUT', function (done) {
    req.put('/movies/A_Few_Good_Men')
      .send({title: 'Test Movie', 'year': 1986})
      .end(function (err, res) {
        if (err) return done(err);
        assert.deepEqual('text/plain', res.headers['content-type']);
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Movie successfully updated.');
        done();
      });
  });

  it('DELETES a movie', function (done) {
    req.delete('/movies/Test_Movie')
      .end(function (err, res) {
        if (err) return done(err);
        assert.deepEqual('text/plain', res.headers['content-type']);
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('Movie successfully deleted.');
        done();
      });
  });

  it('404s on bad route', function (done) {
    req.get('/failing')
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('404s on unsupported HTTP verb', function (done) {
    req.patch('/movies')
      .end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.text).to.have.string('That HTTP verb is not supported here.');
        done();
      });
  });

});
