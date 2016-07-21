const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../lib/server');

chai.use(chaiHttp);

describe('this api server', () => {

	const request = chai.request(server);

  before( done => {
    // Set up two test "users"
    request
      .post('/api/users')
      .send({ name: 'test-user1', security: 'low' })
			.end((err, res) => {
        if (err) return done(err);
			});
    request
      .post('/api/users')
      .send({ name: 'test-user1', security: 'low' })
			.end((err, res) => {
        if (err) return done(err);
        done();
			});
  });

  after( () => {
    // TODO: clean up tests
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

  it('get on user root returns list', done => {
    request
      .get('/api/users')
      .end((err, res) => {
				if (err) return done(err);
				assert.equal(res.statusCode, 200);
				assert.equal(res.header['content-type'], 'application/json');
        console.log(res.text);
				let result = JSON.parse(res.text);
        assert.equal(result.msg, 'success');
        assert.ok(result.users.length);
				done();
      });
  });

	it('post method completes successfully', done => {
		request
			.post('/api/users')
      .send({ name: 'test-user3', security: 'low' })
			.end((err, res) => {
				if (err) return done(err);
				assert.equal(res.statusCode, 200);
				assert.equal(res.header['content-type'], 'application/json');
        console.log(res.text);
				let result = JSON.parse(res.text);
        assert.equal(result.msg, 'success');
        done();
			});
	});

});
