# fetch-client

[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/bubkoo/fetch-client/blob/master/LICENSE)

[![build:?](https://img.shields.io/travis/bubkoo/fetch-client/master.svg?style=flat-square)](https://travis-ci.org/bubkoo/fetch-client)
[![coverage:?](https://img.shields.io/coveralls/bubkoo/fetch-client/master.svg?style=flat-square)](https://coveralls.io/github/bubkoo/fetch-client)
[![Package Quality](http://npm.packagequality.com/shield/fetch-client.svg)](http://packagequality.com/#?package=fetch-client)

> A convenient fetch client with middleware support.

## Features

You can do all the same thing that you do with fetch, plus:

- Runs in Node and all browsers(with polyfill).
- Create custom config instances
- Custom middlewares to intercept requests, responses, and caught errors.
- Useful middlewares available as separate npm packages.

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