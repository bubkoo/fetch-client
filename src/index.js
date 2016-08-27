function toString(o) {
  return Object.prototype.toString.call(o);
}

function isString(o) {
  return typeof o === 'string';
}

function isUndefined(o) {
  return typeof o === 'undefined';
}

function isFormData(o) {
  return toString(o) === '[object FormData]';
}

function isURLSearchParams(o) {
  return toString(o) === '[object URLSearchParams]';
}

function isBlob(o) {
  return toString(o) === '[object Blob]';
}

class FetchClient {

  constructor(options = {}) {

    if (isUndefined(global.fetch)) {
      throw new Error('FetchClient requires a Fetch API implementation, but the current environment doesn\'t support it. You may need to load a polyfill such as https://github.com/matthew-andrews/isomorphic-fetch.');
    }

    this.options     = options;
    this.middlewares = [];
  }

  addMiddlewares(middlewares) {
    this.middlewares.push(...middlewares);
  }

  clearMiddlewares() {
    this.middlewares = [];
  }

  createRequest(url, options, method, data) {

    options = { ...this.options, ...options };

    options.method = method || options.method;
    if (!options.method) {
      options.method = !data && !options.body ? 'GET' : 'POST';
    }

    if (data) {
      if (isString(data) ||
        isFormData(data) ||
        isURLSearchParams(data) ||
        isBlob(data)) {
        options.body = data;
      } else {
        try {
          options.body = global.JSON.stringify(data);
        } catch (e) {
          options.body = data;
        }
      }
    }

    return new global.Request(url, options);
  }

  request(urlOrRequest, ...args) {

    const request = urlOrRequest instanceof global.Request
      ? urlOrRequest
      : this.createRequest(urlOrRequest, ...args);

    let promise = global.Promise.resolve(request);
    let chains  = [global.fetch, null];

    for (let middleware of this.middlewares) {
      chains.unshift(middleware.request, middleware.requestError);
      chains.push(middleware.response, middleware.responseError);
    }

    while (chains.length) {
      promise = promise.then(chains.shift(), chains.shift());
    }

    return promise;
  }

  fetch(url, options) {
    return this.request(url, options);
  }

  get(url, options) {
    return this.request(url, options, 'GET');
  }

  head(url, options) {
    return this.request(url, options, 'HEAD');
  }

  delete(url, options) {
    return this.request(url, options, 'DELETE');
  }

  put(url, data, options) {
    return this.request(url, options, 'PUT', data);
  }

  post(url, data, options) {
    return this.request(url, options, 'POST', data);
  }

  patch(url, data, options) {
    return this.request(url, options, 'PATCH', data);
  }
}

export default FetchClient;
