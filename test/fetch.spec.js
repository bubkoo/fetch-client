import 'isomorphic-fetch';
import './node.fix';
import FetchClient from '../src/index.js';


describe('The fetch() method', () => {

  let url    = 'http://example.com/page';
  let client = new FetchClient();
  let stub;

  before(() => stub = sinon.stub(global, 'fetch'));

  after(() => stub.restore());

  beforeEach(() => stub.reset());


  describe('of default instance', () => {

    it('should call global.fetch with the same parameters (only url)', (done) => {

      global.fetch(url);
      client.fetch(url)
        .then(() => {
          let fetchArgs  = stub.getCall(0).args;
          let clientArgs = stub.getCall(1).args;

          expect(stub.callCount).to.be.equal(2);
          expect(clientArgs.length).to.be.equal(1);
          expect(clientArgs[0].url).to.be.equal(fetchArgs[0]);
          expect(clientArgs[0].method).to.be.equal('GET');

          done();
        })
        .catch(done.fail);
    });

    it('should add default GET method if not present', (done) => {

      let options = {
        headers: {
          'x-custom-header': 'custom'
        }
      };

      global.fetch(url, options);
      client.fetch(url, options)
        .then(() => {
          let fetchArgs  = stub.getCall(0).args;
          let clientArgs = stub.getCall(1).args;

          expect(stub.callCount).to.be.equal(2);
          expect(clientArgs.length).to.be.equal(1);
          expect(clientArgs[0].url).to.be.equal(fetchArgs[0]);
          expect(clientArgs[0].headers.has('x-custom-header')).to.be.equal(true);
          expect(clientArgs[0].headers.get('x-custom-header'))
            .to.be.equal(fetchArgs[1].headers['x-custom-header']);
          expect(clientArgs[0].method).to.be.equal('GET');

          done();
        })
        .catch(done.fail);
    });

    it('should not change the method if specified', (done) => {

      let options = {
        headers: {
          'x-custom-header': 'custom'
        },
        method: 'PUT',
      };

      global.fetch(url, options);
      client.fetch(url, options)
        .then(() => {
          let fetchArgs  = stub.getCall(0).args;
          let clientArgs = stub.getCall(1).args;

          expect(stub.callCount).to.be.equal(2);
          expect(clientArgs.length).to.be.equal(1);
          expect(clientArgs[0].url).to.be.equal(fetchArgs[0]);
          expect(clientArgs[0].headers.has('x-custom-header')).to.be.equal(true);
          expect(clientArgs[0].headers.get('x-custom-header'))
            .to.be.equal(fetchArgs[1].headers['x-custom-header']);
          expect(clientArgs[0].method).to.be.equal('PUT');

          done();
        })
        .catch(done.fail);
    });

    it('should add POST method if no method is specified and there is a body', (done) => {

      let options = {
        headers: {
          'x-custom-header': 'custom'
        },
        body: global.JSON.stringify({
          data: 'data'
        })
      };

      global.fetch(url, options);
      client.fetch(url, options)
        .then(() => {
          let fetchArgs  = stub.getCall(0).args;
          let clientArgs = stub.getCall(1).args;

          expect(stub.callCount).to.be.equal(2);
          expect(clientArgs.length).to.be.equal(1);
          expect(clientArgs[0].url).to.be.equal(fetchArgs[0]);
          expect(clientArgs[0].headers.has('x-custom-header')).to.be.equal(true);
          expect(clientArgs[0].headers.get('x-custom-header'))
            .to.be.equal(fetchArgs[1].headers['x-custom-header']);
          expect(clientArgs[0].method).to.be.equal('POST');
          return clientArgs[0].text();
        })
        .then((fetchItBody) => {
          expect(fetchItBody).to.be.equal(options.body);

          done();
        })
        .catch(done.fail);
    });
  });

  describe('of specific instance', () => {

    it('should call global.fetch with the correct options', (done) => {

      let options = {
        method: 'GET',
        headers: {
          'x-custom-header': 'custom'
        }
      };

      let instance = new FetchClient(options);

      instance.fetch(url)
        .then(() => {
          expect(stub.callCount).to.be.equal(1);
          let fetchArgs = stub.getCall(0).args;

          expect(fetchArgs.length).to.be.equal(1);
          expect(fetchArgs[0].url).to.be.equal(url);
          expect(fetchArgs[0].method).to.be.equal('GET');
          expect(fetchArgs[0].headers.has('x-custom-header')).to.be.equal(true);
          expect(fetchArgs[0].headers.get('x-custom-header')).to.be.equal('custom');
        })
        .then(done, done);
    });
  });
});
