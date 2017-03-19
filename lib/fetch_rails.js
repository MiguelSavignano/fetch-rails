'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var merge = function merge(object, otherObject) {
  return Object.assign({}, object, otherObject);
};

var getCSRF = function getCSRF() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
};

var mergeParameters = function mergeParameters() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!params || params == {}) {
    return url;
  }
  var esc = encodeURIComponent;
  var query = Object.keys(params).map(function (key) {
    return esc(key) + '=' + esc(params[key]);
  }).join('&');
  return url + '?' + query;
};

var defaultHeadersJSON = function defaultHeadersJSON() {
  return {
    "X-Requested-With": 'XMLHttpRequest',
    'X-CSRF-Token': getCSRF(),
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
};

var defaultHeaders = function defaultHeaders() {
  return {
    "X-Requested-With": 'XMLHttpRequest',
    'X-CSRF-Token': getCSRF()
  };
};

var defaultCredentials = function defaultCredentials() {
  return 'same-origin';
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

var parseJSON = function parseJSON(response) {
  return response.json();
};

var parseText = function parseText(response) {
  return response.text();
};

var Fetch = {
  json: function json(url, params) {
    var url = mergeParameters(url, params);
    var options = {
      headers: defaultHeadersJSON(),
      credentials: defaultCredentials()
    };
    return fetch(url, options).then(checkStatus).then(parseJSON);
  },
  postJSON: function postJSON(url, body) {
    var options = {
      headers: defaultHeadersJSON(),
      credentials: defaultCredentials(),
      method: 'post',
      body: JSON.stringify(body)
    };
    return fetch(url, options).then(checkStatus).then(parseJSON);
  },
  putJSON: function putJSON(url, body) {
    var options = {
      headers: defaultHeadersJSON(),
      credentials: defaultCredentials(),
      method: 'put',
      body: JSON.stringify(body)
    };
    return fetch(url, options).then(checkStatus).then(parseJSON);
  },
  deleteJSON: function deleteJSON(url) {
    var options = {
      headers: defaultHeadersJSON(),
      credentials: defaultCredentials(),
      method: 'delete'
    };
    return fetch(url, options).then(checkStatus).then(parseJSON);
  },
  html: function html(url, params) {
    var url = mergeParameters(url, params);
    var options = {
      headers: defaultHeaders(),
      credentials: defaultCredentials()
    };
    return fetch(url, options).then(checkStatus);
  },
  text: function text(url, options) {
    var url = mergeParameters(url, params);
    var options = {
      headers: defaultHeaders(),
      credentials: defaultCredentials()
    };
    return fetch(url, options).then(checkStatus).then(parseText);
  },
  postForm: function postForm(url, form) {
    var options = {
      headers: defaultHeadersHTML(),
      credentials: defaultCredentials(),
      body: new FormData(document.querySelector(form)),
      method: 'post'
    };
    return fetch(url, options).then(checkStatus);
  }
};

// uploadFile: (url, form, file, options) => {
//   var data = new FormData(document.querySelector(form))
//   data.append('file', file.files[0])
//   var options = {
//     headers: defaultHeaders(),
//     credentials: defaultCredentials(),
//     body: new FormData(document.querySelector(form)),
//     method: 'post',
//   }
//   return fetch(url, options).then(checkStatus)
// },

exports.default = Fetch;
