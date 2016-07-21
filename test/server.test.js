const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const server = require('../lib/server');
var data = require('../data');

chai.use(chaiHttp);

describe('http-server', ()=>{

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

  it('errors on an invalid resource', done=>{
    request.get('/notes/foo')
      .end((error, response)=>{
        if(error)return done(error);
        assert.equal(response.text, 'Resource not found.');
        done();
      });
  });

  it('Error 400 on invalid URL', done=>{
    request.get('/fakepage')
      .end((error, response)=>{
        assert.equal(response.status, 400);
        done();
      });
  });
});
