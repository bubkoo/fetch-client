# fetch-client

> A convenient fetch client with middleware support.

[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/bubkoo/fetch-client/blob/master/LICENSE)

[![build:?](https://img.shields.io/travis/bubkoo/fetch-client/master.svg?style=flat-square)](https://travis-ci.org/bubkoo/fetch-client)
[![coverage:?](https://img.shields.io/coveralls/bubkoo/fetch-client/master.svg?style=flat-square)](https://coveralls.io/github/bubkoo/fetch-client)
[![Package Quality](http://npm.packagequality.com/shield/fetch-client.svg)](http://packagequality.com/#?package=fetch-client)


## Features

You can do all the same thing that you do with fetch, plus:

- Custom middlewares to intercept requests, responses, and caught errors.
- Useful middlewares available as separate npm packages.
- Create custom config instances.
- Convenient aliases for the supported methods.
- Runs in Node and all browsers(with polyfill).

## Installation

```
$ npm install --save fetch-client
```

## Usage

*Note:* Make sure you have a fetch [compatible environment](http://caniuse.com/#search=fetch) or added a appropriate [polyfill](https://github.com/matthew-andrews/isomorphic-fetch).


Performing a `GET` request

```js
import FetchClient from 'fetch-client';

let fetchClient = new FetchClient();
fetchClient.get('http://httpbin.org/get?param1=param1')
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
```

Performing a `POST` request

```js

import FetchClient from 'fetch-client';

let fetchClient = new FetchClient();
fetchClient.post('http://httpbin.org/post?param1=param1', {
  param2: 'param2',
  param3: 'param3'
}).then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
```

## API

### Create custom config instance

You can create a new instance of FetchClient with a custom config.

```js
let fetchClient = new FetchClient({
  headers: {
    'X-Custom-Header': 'foobar'
  }
});

fetchClient.get(url)
  .then((response) => {
    // handle response
  })
  .catch((error) => {
    // handle error
  });
```

### Request method aliases

For convenience aliases have been provided for all supported request methods.

- fetchClient.fetch(url[, options])
- fetchClient.fetch(request[, options])
- fetchClient.get(url[, options])
- fetchClient.get(request[, options])
- fetchClient.head(url[, options])
- fetchClient.head(request[, options])
- fetchClient.delete(url[, options])
- fetchClient.delete(request[, options])
- fetchClient.put(url[, data[, options]])
- fetchClient.put(request[, data[, options]])
- fetchClient.post(url[, data[, options]])
- fetchClient.post(request[, data[, options]])
- fetchClient.patch(url[, data[, options]])
- fetchClient.patch(request[, data[, options]])

*NOTE:* When using the alias methods `url`, `method`, and `data` properties don't need to be specified in options.


## Middleware

You can add middleware objects to any instance, to intercept requests and responses.

The middleware object must have defined at least one of these methods:

- `request(req)` takes the [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) that will be passed to `global.fetch()` after interceptors run. It should return the same Request, or create a new one. Errors thrown in request interceptors will be handled by `requestError` interceptors.
- `requestError(error)` acts as a Promise rejection handler during Request creation and request interceptor execution. It will receive the rejection reason, and can either re-throw, or recover by returning a valid Request.
- `response(res)` will be run after `fetch()`` completes, and will receive the resulting [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response). As with request, it can either pass the Response along, return a modified response, or throw.
- `responseError(error)` is similar to `requestError`, and acts as a Promise rejection handler for response rejections.

```js
let jsonMiddleware = {
  response(res) {
    return res.json().catch((e) => {
      return e;
    });
  }
};

// fetchClient.addMiddlewares(ArrayOrMiddlewares)
fetchClient.addMiddlewares(jsonMiddleware);

// clear
fetchClient.clearMiddlewares();
```

### Interceptors' running sequence

```js
import FetchClient from 'fetch-client';

let fetchClient = new FetchClient();
let middleware1 = {
  request(req) {
    req.headers.set('x-req-fake1', true);
    return req;
  },

  requestError(error) {
    return global.Promise.reject(error);
  },

  response(res) {
    res.headers.set('x-res-fake1', true);
    return res;
  },

  responseError(error) {
    return global.Promise.reject(error);
  }
};
let middleware2 = {
  request(req) {
    req.headers.set('x-req-fake2', true);
    return req;
  },

  requestError(error) {
    return global.Promise.reject(error);
  },

  response(res) {
    res.headers.set('x-res-fake2', true);
    return res;
  },

  responseError(error) {
    return global.Promise.reject(error);
  }
};

fetchClient.addMiddlewares([middleware1, middleware2]);
fetchClient.fetch('http://example.com/page');


// the interceptors will be executed with the following sequence, equal with:
let req = new Request('http://example.com/page');
let promise = Promise.resolve(req);

promise
  // handle request
  .then(middleware1.request)
  .then(null, middleware1.requestError)
  .then(middleware2.request)
  .then(null, middleware2.requestError)
  // call the fetch method
  .then(global.fetch)
  // handle response
  .then(middleware1.response)
  .then(null, middleware1.responseError)
  .then(middleware2.response)
  .then(null, middleware2.responseError);
```

### Additional middlewares

On the way...

## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/bubkoo/fetch-client/issues/new).