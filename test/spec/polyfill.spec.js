import FetchClient from '../../src/index.js';

describe('The detection of polyfill', () => {

  it('should throw an Error when Fetch API not available', () => {

    const fetch = global.fetch;

    global.fetch = undefined;
    delete global.fetch;

    expect(FetchClient).to.throw(Error);

    global.fetch = fetch;
  });
});
