'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Fetch = {
  getCSRF: function getCSRF() {
    var element = document.querySelector('meta[name="csrf-token"]');
    if (element) {
      return element.getAttribute('content');
    } else {
      return "";
    }
  },
  defaultHeadersJSON: function defaultHeadersJSON(options) {
    return options.headers || {
      "X-Requested-With": 'XMLHttpRequest',
      'X-CSRF-Token': this.getCSRF(),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  },
  defaultHeaders: function defaultHeaders(options) {
    return options.headers || {
      "X-Requested-With": 'XMLHttpRequest',
      'X-CSRF-Token': this.getCSRF()
    };
  },
  defaultCredentials: function defaultCredentials(options) {
    return options.credentials || 'same-origin';
  },
  checkStatus: function checkStatus(response) {
    return new Promise(function (resolve, reject) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        response.json().then(function (response_json) {
          reject(response_json);
        });
      }
    });
  },
  json: function json(url, params, options) {
    var url = mergeParameters(url, params);
    var options = {
      headers: this.defaultHeadersJSON(options),
      credentials: this.defaultCredentials(options)
    };
    return fetch(url, options).then(this.checkStatus).then(parseJSON);
  },
  requestDataJSON: function requestDataJSON(method, url, body, options) {
    var options = {
      headers: this.defaultHeadersJSON(options),
      credentials: this.defaultCredentials(options),
      method: method,
      body: JSON.stringify(body)
    };
    return fetch(url, options).then(this.checkStatus).then(parseJSON);
  },
  postJSON: function postJSON(url, body, options) {
    return this.requestDataJSON("post", url, body, options);
  },
  putJSON: function putJSON(url, body, options) {
    return this.requestDataJSON("put", url, body, options);
  },
  deleteJSON: function deleteJSON(url, options) {
    return this.requestDataJSON("delete", url, body, options);
  },
  html: function html(url, params, options) {
    var url = mergeParameters(url, params);
    var options = {
      headers: this.defaultHeaders(options),
      credentials: this.defaultCredentials(options)
    };
    return fetch(url, options).then(this.checkStatus);
  },
  text: function text(url, options) {
    var url = mergeParameters(url, params);
    var options = {
      headers: this.defaultHeaders(options),
      credentials: this.defaultCredentials(options)
    };
    return fetch(url, options).then(this.checkStatus).then(parseText);
  },
  postForm: function postForm(url, form, options) {
    var options = {
      headers: this.defaultHeadersHTML(options),
      credentials: this.defaultCredentials(options),
      body: new FormData(document.querySelector(form)),
      method: options.method || 'post'
    };
    return fetch(url, options).then(this.checkStatus);
  }

  // helpers
};var mergeParameters = function mergeParameters() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!params || Object.keys(params).length === 0) {
    return url;
  }
  var query = encodeParams(params);
  return url + '?' + query;
};

var parseJSON = function parseJSON(response) {
  return response.json();
};

var parseText = function parseText(response) {
  return response.text();
};

var encodeParams = exports.encodeParams = function encodeParams(a) {
  var s = [],
      rbracket = /\[\]$/,
      isArray = function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  },
      add = function add(k, v) {
    v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
    s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
  },
      buildParams = function buildParams(prefix, obj) {
    var i, len, key;

    if (prefix) {
      if (isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
          if (rbracket.test(prefix)) {
            add(prefix, obj[i]);
          } else {
            buildParams(prefix + '[' + (_typeof(obj[i]) === 'object' ? i : '') + ']', obj[i]);
          }
        }
      } else if (obj && String(obj) === '[object Object]') {
        for (key in obj) {
          buildParams(prefix + '[' + key + ']', obj[key]);
        }
      } else {
        add(prefix, obj);
      }
    } else if (isArray(obj)) {
      for (i = 0, len = obj.length; i < len; i++) {
        add(obj[i].name, obj[i].value);
      }
    } else {
      for (key in obj) {
        buildParams(key, obj[key]);
      }
    }
    return s;
  };

  return buildParams('', a).join('&').replace(/%20/g, '+');
};

exports.default = Fetch;
