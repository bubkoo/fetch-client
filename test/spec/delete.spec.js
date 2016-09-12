import 'isomorphic-fetch';
import FetchClient from '../src/index.js';


describe('The delete() method', () => {

  let url    = 'http://example.com/page';
  let client = new FetchClient();
  let stub;

  before(() => stub = sinon.stub(global, 'fetch'));

  after(() => stub.restore());

  beforeEach(() => stub.reset());


  it('should call global.fetch with the same parameters', (done) => {
    global.fetch(url, { method: 'DELETE' });
    client.delete(url)
      .then(() => {
        const fetchArgs  = stub.getCall(0).args;
        const clientArgs = stub.getCall(1).args;

        expect(stub.callCount).to.be.equal(2);
        expect(clientArgs.length).to.be.equal(1);
        expect(clientArgs[0].url).to.be.equal(fetchArgs[0]);
        expect(clientArgs[0].method).to.be.equal(fetchArgs[1].method);
        expect(clientArgs[0].method).to.be.equal('DELETE');

        done();
      })
      .catch(done.fail);
  });

  it('should not change the method if it is specified in options', (done) => {

    let options = {
      method: 'PUT',
    };

    global.fetch(url, { method: 'DELETE' });
    client.delete(url, options)
      .then(() => {
        const fetchArgs  = stub.getCall(0).args;
        const clientArgs = stub.getCall(1).args;

        expect(stub.callCount).to.be.equal(2);
        expect(clientArgs.length).to.be.equal(1);
        expect(clientArgs[0].url).to.be.equal(fetchArgs[0]);
        expect(clientArgs[0].method).to.be.equal(fetchArgs[1].method);
        expect(clientArgs[0].method).to.be.equal('DELETE');

        done();
      })
      .catch(done.fail);
  });
});
