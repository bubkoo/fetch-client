import 'isomorphic-fetch';
import './node.fix';
import FetchClient from '../../src/index.js';


describe('The post() method', () => {

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
      method: 'POST'
    });
    client.post(url, data)
      .then(() => {

        const fetchArgs  = stub.getCall(0).args;
        const clientArgs = stub.getCall(1).args;

        expect(stub.callCount).to.be.equal(2);
        expect(clientArgs.length).to.be.equal(1);
        expect(clientArgs[0].url).to.be.equal(fetchArgs[0]);
        expect(clientArgs[0].method).to.be.equal(fetchArgs[1].method);
        expect(clientArgs[0].method).to.be.equal('POST');

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
      method: 'PUT',
    };

    let data = {
      data: 'data'
    };

    global.fetch(url, {
      body: global.JSON.stringify(data),
      method: 'POST'
    });
    client.post(url, data, options)
      .then(() => {

        const fetchArgs  = stub.getCall(0).args;
        const clientArgs = stub.getCall(1).args;

        expect(stub.callCount).to.be.equal(2);
        expect(clientArgs.length).to.be.equal(1);
        expect(clientArgs[0].url).to.be.equal(fetchArgs[0]);
        expect(clientArgs[0].method).to.be.equal(fetchArgs[1].method);
        expect(clientArgs[0].method).to.be.equal('POST');

        return global.Promise.all([clientArgs[0].text(), fetchArgs[1].body]);
      })
      .then(([fetchItBody, fetchBody]) => {
        expect(fetchItBody).to.be.equal(fetchBody);
        done();
      })
      .catch(done.fail);
  });

  function skipUnsupported(key, message, callback) {

    const fn = (key in global) ? it : it.skip;

    fn(message, callback);
  }

  skipUnsupported('FormData', 'should work send a FormData object', (done) => {

    let data = new global.FormData();

    data.append('field1', 'field1value');
    data.append('field2', 'field2value');

    global.fetch(url, {
      body: data,
      method: 'POST'
    });


    client.post(url, data)
      .then(() => {

        const fetchArgs     = stub.getCall(0).args;
        const clientArgs    = stub.getCall(1).args;
        const clientRequest = clientArgs[0];
        const nativeRequest = new global.Request(url, {
          body: data,
          method: 'POST'
        });

        expect(stub.callCount).to.be.equal(2);
        expect(clientArgs.length).to.be.equal(1);
        expect(clientRequest.url).to.be.equal(fetchArgs[0]);
        expect(clientRequest.method).to.be.equal(fetchArgs[1].method);
        expect(clientRequest.method).to.be.equal('POST');

        expect(clientRequest.formData).to.throw(Error);
        done();


        // return Promise.all([
        //   clientRequest.formData(),
        //   nativeRequest.formData()
        // ]);
      })
      // .then(([clientFormData, fetchFormData]) => {
      //
      //   expect(clientFormData.get('field1')).to.be.equal(fetchFormData.get('field1'));
      //   expect(clientFormData.get('field2')).to.be.equal(fetchFormData.get('field2'));
      //
      //   done();
      // })
      .catch(done.fail);
  });

  skipUnsupported('Blob', 'should work send a Blob object', (done) => {

    let data = new global.Blob(['hello fetch'], { type: 'text/plain' });

    global.fetch(url, {
      body: data,
      method: 'POST'
    });

    client.post(url, data)
      .then(() => {

        const fetchArgs  = stub.getCall(0).args;
        const clientArgs = stub.getCall(1).args;

        expect(stub.callCount).to.be.equal(2);
        expect(clientArgs.length).to.be.equal(1);
        expect(clientArgs[0].url).to.be.equal(fetchArgs[0]);
        expect(clientArgs[0].method).to.be.equal(fetchArgs[1].method);
        expect(clientArgs[0].method).to.be.equal('POST');

        return global.Promise.all([
          clientArgs[0].text(),
          new global.Request(url, {
            body: data,
            method: 'POST'
          }).text()
        ]);
      })
      .then(([clientBlob, fetchBlob]) => {
        expect(clientBlob).to.be.equal(fetchBlob);
        done();
      })
      .catch(done.fail);
  });

  skipUnsupported('URLSearchParams', 'should work send a URLSearchParams object', (done) => {

    let data = new global.URLSearchParams();
    data.append('field1', 'field1value');
    data.append('field2', 'field2value');

    global.fetch(url, {
      body: data,
      method: 'POST'
    });
    client.post(url, data)
      .then(() => {

        const fetchArgs  = stub.getCall(0).args;
        const clientArgs = stub.getCall(1).args;

        expect(stub.callCount).to.be.equal(2);
        expect(clientArgs.length).to.be.equal(1);
        expect(clientArgs[0].url).to.be.equal(fetchArgs[0]);
        expect(clientArgs[0].method).to.be.equal(fetchArgs[1].method);
        expect(clientArgs[0].method).to.be.equal('POST');

        return global.Promise.all([
          clientArgs[0].text(),
          new global.Request(url, {
            body: data,
            method: 'POST'
          }).text()
        ]);
      })
      .then(([clientURLSearchParams, fetchURLSearchParams]) => {
        expect(clientURLSearchParams).to.be.equal(fetchURLSearchParams);
        done();
      })
      .catch(done.fail);
  });

});
