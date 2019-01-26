let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
/*
 * Test the /GET route
 */
describe('/GET fast feed', () => {
  it('it should GET rss feed from acast and return only 50 objs', (done) => {
    chai.request(server)
      .get('/fast_feed')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(50);
        done();
      });
  });
});

describe('/GET slower feed', () => {
  it('it should GET rss feed from acast and return only 5 objs', (done) => {
    chai.request(server)
      .get('/feeds')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(5);
        done();
      });
  });
});