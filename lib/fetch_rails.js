'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var headers = function headers() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  options.headers['X-Requested-With'] = 'XMLHttpRequest';
  options.headers['X-CSRF-Token'] = getCSRF();
  return options;
};

var getCSRF = function getCSRF() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
};

var credentials = function credentials(options) {
  if (options == null) options = {};
  if (options.credentials == null) options.credentials = 'same-origin';
  return options;
};

var status = function status(response) {
  if (response.ok) {
    return response;
  } else {
    var error = new Error(response.statusText || response.status);
    error.response = response;
    throw error;
  }
};

var json = function json(response) {
  return response.json();
};

var text = function text(response) {
  return response.text();
};

var Fetch = {
  fetchHTML: function fetchHTML(url, options) {
    return fetch(url, headers(credentials(options))).then(status);
  },
  fetchText: function fetchText(url, options) {
    return fetch(url, headers(credentials(options))).then(status).then(text);
  },
  fetchJSON: function fetchJSON(url, options) {
    options = headers(credentials(options));
    options.headers['Accept'] = 'application/json';
    options.headers['Content-Type'] = 'application/json';
    return fetch(url, options).then(status).then(json);
  },
  postForm: function postForm(url, form, options) {
    options = headers(credentials(options));
    options.body = new FormData(document.querySelector(form));
    options.method = 'post';
    return fetch(url, options).then(status);
  },
  postJSON: function postJSON(url, body, options) {
    options = headers(credentials(options));
    options.body = JSON.stringify(body);
    options.headers['Accept'] = 'application/json';
    options.headers['Content-Type'] = 'application/json';
    options.method = 'post';
    return fetch(url, options).then(status).then(json);
  },
  putJSON: function putJSON(url, body, options) {
    options = headers(credentials(options));
    options.body = JSON.stringify(body);
    options.headers['Accept'] = 'application/json';
    options.headers['Content-Type'] = 'application/json';
    options.method = 'put';
    return fetch(url, options).then(status).then(json);
  },
  deleteJSON: function deleteJSON(url, body, options) {
    options = headers(credentials(options));
    options.body = JSON.stringify(body);
    options.headers['Accept'] = 'application/json';
    options.headers['Content-Type'] = 'application/json';
    options.method = 'delete';
    return fetch(url, options).then(status).then(json);
  },
  uploadFile: function uploadFile(url, form, file, options) {
    var data = new FormData(document.querySelector(form));
    data.append('file', file.files[0]);
    options = headers(credentials(options));
    options.body = data;
    options.method = 'post';
    return fetch(url, options).then(status);
  }
};

exports.default = Fetch;
