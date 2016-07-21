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

  it(`tests /notes`, (done) => {
    request
      .get(`/notes`)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
      });
    done();
  });

  it(`tests /notes/someresource`, (done) => {
    request
      .get(`/notes/1`)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
      });
    done();
  });

  

  
});