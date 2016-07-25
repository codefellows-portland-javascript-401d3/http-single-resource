const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const server = require('../lib/server');
const data = require('../data');

chai.use(chaiHttp);

describe('server', ()=>{

  const request = chai.request(server);

  it('gets all notes', done=>{
    request.get('/notes')
      .end((error, response)=>{
        if(error)return done(error);
        assert.equal(response.text, JSON.stringify(data.notes));
        done();
      });
  });

  it('gets note 1', done=>{
    request.get('/notes/1')
      .end((error, response)=>{
        if(error)return done(error);
        assert.equal(response.text, JSON.stringify(data.notes[0]));
        done();
      });
  });

  it('errors on a note id that is not a number', done=>{
    request.get('/notes/foo')
      .end((error, response)=>{
        assert.equal(response.text, 'Resource not found.');
        done();
      });
  });

  it('errors on a note that does not exist', done=>{
    request.get('/notes/400')
      .end((error, response)=>{
        assert.equal(response.text, 'Resource not found.');
        done();
      });
  });

  it('Error 400 on invalid category', done=>{
    request.get('/fakepage')
      .end((error, response)=>{
        assert.equal(response.status, 400);
        done();
      });
  });

  it('Error 400 on invalid item', done=>{
    request.get('/fakepage/23')
      .end((error, response)=>{
        assert.equal(response.status, 400);
        done();
      });
  });

  it('Error 400 on non GET request', done=>{
    request.post('/notes')
      .end((error, response)=>{
        assert.equal(response.status, 400);
        done();
      });
  });
});
