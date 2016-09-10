import 'isomorphic-fetch';
import FetchClient from '../src/index.js';


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

  it.skip('should work send a FormData object', (done) => {

    if (!('FormData' in global)) {
      done();
      return;
    }

    let data = new FormData();

    data.append('field1', 'field1value');

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

        // expect(clientArgs[0].formData).to.throw(Error);

        return global.Promise.all([
          clientArgs[0].formData(),
          new global.Request(url, {
            body: data,
            method: 'POST'
          }).formData()
        ]);

        done();
      })
      .then(([clientFormData, fetchFormData]) => {
        expect(clientFormData).to.be.equal(fetchFormData);
        done();
      })
      .catch(done.fail);
  });

  it('should work send a Blob object', (done) => {

    if (!('Blob' in global)) {
      done();
      return;
    }

    let data = new global.Blob(['hola'], { type: 'text/plain' });

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

  it('should work send a URLSearchParams object', (done) => {

    if (!('URLSearchParams' in global)) {
      done();
      return;
    }

    let data = new global.URLSearchParams();
    data.append('field1', 'field1value');

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
