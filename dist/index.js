!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.FetchClient=t():e.FetchClient=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t){(function(r){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e){return Object.prototype.toString.call(e)}function i(e){return"string"==typeof e}function a(e){return"undefined"==typeof e}function s(e){return"[object FormData]"===u(e)}function c(e){return"[object URLSearchParams]"===u(e)}function f(e){return"[object Blob]"===u(e)}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},h=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),d=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(o(this,e),a(r.fetch))throw new Error("FetchClient requires a Fetch API implementation, but the current environment doesn't support it. You may need to load a polyfill such as https://github.com/matthew-andrews/isomorphic-fetch.");this.options=t,this.middlewares=[]}return h(e,[{key:"addMiddlewares",value:function(e){var t;(t=this.middlewares).push.apply(t,n(e))}},{key:"clearMiddlewares",value:function(){this.middlewares=[]}},{key:"createRequest",value:function(e,t,n,o){if(t=l({},this.options,t),t.method=n||t.method,t.method||(t.method=o||t.body?"POST":"GET"),o)if(i(o)||s(o)||c(o)||f(o))t.body=o;else try{t.body=r.JSON.stringify(o)}catch(u){t.body=o}return new r.Request(e,t)}},{key:"request",value:function t(e){for(var n=arguments.length,o=Array(n>1?n-1:0),u=1;u<n;u++)o[u-1]=arguments[u];var t=e instanceof r.Request?e:this.createRequest.apply(this,[e].concat(o)),i=r.Promise.resolve(t),a=[r.fetch,null],s=!0,c=!1,f=void 0;try{for(var l,h=this.middlewares[Symbol.iterator]();!(s=(l=h.next()).done);s=!0){var d=l.value;a.unshift(d.request,d.requestError),a.push(d.response,d.responseError)}}catch(p){c=!0,f=p}finally{try{!s&&h["return"]&&h["return"]()}finally{if(c)throw f}}for(;a.length;)i=i.then(a.shift(),a.shift());return i}},{key:"fetch",value:function(e,t){return this.request(e,t)}},{key:"get",value:function(e,t){return this.request(e,t,"GET")}},{key:"head",value:function(e,t){return this.request(e,t,"HEAD")}},{key:"delete",value:function(e,t){return this.request(e,t,"DELETE")}},{key:"put",value:function(e,t,r){return this.request(e,r,"PUT",t)}},{key:"post",value:function(e,t,r){return this.request(e,r,"POST",t)}},{key:"patch",value:function(e,t,r){return this.request(e,r,"PATCH",t)}}]),e}();t["default"]=d,e.exports=t["default"]}).call(t,function(){return this}())}])});
//# sourceMappingURL=index.js.map