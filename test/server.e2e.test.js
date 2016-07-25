const chai = require(`chai`);
const chaiHttp = require(`chai-http`);
const assert = chai.assert;
const server = require(`../server`);
const url = require(`url`);

chai.use(chaiHttp);

const request = chai.request(server);

describe(`testing server`, () => {
  it(`tests /`, (done) => {
    request
      .get(`/`)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        done();
      });
  });

  it(`tests get request`, (done) => {
    request
      .get(`/notes`)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
      });
    done();
  });

  it(`tests get request /notes/someresource`, (done) => {
    request
      .get(`/notes/1`)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
      });
    done();
  });

  it(`tests post request`, (done) => {
    request
      .post(`/notes`)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        done();
      });
  });

  it(`tests delete request`, done => {
    request
      .del(`/notes`)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        done();
      });
  });

  it(`tests server error `, done => {
    request
      .get(`/bob`)
      .end((err, res) => {
        assert.equal(res.statusCode, 404);
        done();
      });
  });

  
});