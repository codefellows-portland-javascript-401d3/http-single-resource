const chai = require(`chai`);
const chaiHttp = require(`chai-http`);
const assert = chai.assert;
const server = require(`../server`);
const url = require(`url`);

chai.use(chaiHttp);

describe(`server tests`, () => {
  const request = chai.request(server);
  
  it(`server connects`), (done) => {
    request
      .get(`/get`)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        done();
      });
  };

  
  };
});