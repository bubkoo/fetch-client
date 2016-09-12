import 'isomorphic-fetch';
import './node.fix';
import FetchClient from '../src/index.js';


describe('The put() method', () => {

  let url    = 'http://example.com/page';
  let client = new FetchClient();
  let stub;

  before(() => stub = sinon.stub(global, 'fetch'));

  after(() => stub.restore());

  beforeEach(() => stub.reset());


  it('should call global.fetch with the same parameters', (done) => {

    let data = {
      data: 'data'
    };

    global.fetch(url, {
      body: global.JSON.stringify(data),
      method: 'PUT'
    });
    client.put(url, data)
      .then(() => {

        const fetchArgs   = stub.getCall(0).args;
        const clientArgs = stub.getCall(1).args;

        expect(stub.callCount).to.be.equal(2);
        expect(clientArgs.length).to.be.equal(1);
        expect(clientArgs[0].url).to.be.equal(fetchArgs[0]);
        expect(clientArgs[0].method).to.be.equal(fetchArgs[1].method);
        expect(clientArgs[0].method).to.be.equal('PUT');
        return global.Promise.all([clientArgs[0].text(), fetchArgs[1].body]);
      })
      .then(([fetchItBody, fetchBody]) => {
        expect(fetchItBody).to.be.equal(fetchBody);
        done();
      })
      .catch(done.fail);
  });

  it('should not change the method if it is specified in options', (done) => {

    let options = {
      method: 'POST',
    };

    let data = {
      data: 'data'
    };

    global.fetch(url, {
      body: global.JSON.stringify(data),
      method: 'PUT'
    });
    client.put(url, data, options)
      .then(() => {

        const fetchArgs   = stub.getCall(0).args;
        const clientArgs = stub.getCall(1).args;

        expect(stub.callCount).to.be.equal(2);
        expect(clientArgs.length).to.be.equal(1);
        expect(clientArgs[0].url).to.be.equal(fetchArgs[0]);
        expect(clientArgs[0].method).to.be.equal(fetchArgs[1].method);
        expect(clientArgs[0].method).to.be.equal('PUT');

        return global.Promise.all([clientArgs[0].text(), fetchArgs[1].body]);
      })
      .then(([fetchItBody, fetchBody]) => {
        expect(fetchItBody).to.be.equal(fetchBody);
        done();
      })
      .catch(done.fail);
  });
});
