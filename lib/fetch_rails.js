'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getCSRF = function getCSRF() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
};

var mergeParameters = function mergeParameters() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!params || Object.keys(params).length === 0) {
    return url;
  }
  var query = $.param(params);
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

var parseJSON = function parseJSON(response) {
  return response.json();
};

var parseText = function parseText(response) {
  return response.text();
};

var Fetch = {
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
  json: function json(url, params) {
    var url = mergeParameters(url, params);
    var options = {
      headers: defaultHeadersJSON(),
      credentials: defaultCredentials()
    };
    return fetch(url, options).then(Fetch.checkStatus).then(parseJSON);
  },
  postJSON: function postJSON(url, body) {
    var options = {
      headers: defaultHeadersJSON(),
      credentials: defaultCredentials(),
      method: 'post',
      body: JSON.stringify(body)
    };
    return fetch(url, options).then(Fetch.checkStatus).then(parseJSON);
  },
  putJSON: function putJSON(url, body) {
    var options = {
      headers: defaultHeadersJSON(),
      credentials: defaultCredentials(),
      method: 'put',
      body: JSON.stringify(body)
    };
    return fetch(url, options).then(Fetch.checkStatus).then(parseJSON);
  },
  deleteJSON: function deleteJSON(url) {
    var options = {
      headers: defaultHeadersJSON(),
      credentials: defaultCredentials(),
      method: 'delete'
    };
    return fetch(url, options).then(Fetch.checkStatus).then(parseJSON);
  },
  html: function html(url, params) {
    var url = mergeParameters(url, params);
    var options = {
      headers: defaultHeaders(),
      credentials: defaultCredentials()
    };
    return fetch(url, options).then(Fetch.checkStatus);
  },
  text: function text(url, options) {
    var url = mergeParameters(url, params);
    var options = {
      headers: defaultHeaders(),
      credentials: defaultCredentials()
    };
    return fetch(url, options).then(Fetch.checkStatus).then(parseText);
  },
  postForm: function postForm(url, form) {
    var options = {
      headers: defaultHeadersHTML(),
      credentials: defaultCredentials(),
      body: new FormData(document.querySelector(form)),
      method: 'post'
    };
    return fetch(url, options).then(Fetch.checkStatus);
  }
};

exports.default = Fetch;
