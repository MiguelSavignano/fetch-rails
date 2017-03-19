'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isEmptyObject = function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
};

var encodeSubObject = function encodeSubObject(key, subObject) {
  var esc = encodeURIComponent;
  return Object.keys(subObject).map(function (subKey) {
    var subValue = subObject[subKey];
    return key + '%5B' + esc(subKey) + '%5D=' + esc(subValue);
  }).join("&");
};

var encodeSubArray = function encodeSubArray(key, subArray) {
  return subArray.map(function (_value) {
    return key + '%5B%5D=' + _value;
  }).join('&');
};

var encodeParams = function encodeParams(params) {
  var esc = encodeURIComponent;
  var query = Object.keys(params).map(function (key) {
    var value = params[key];
    if (Array.isArray(value)) {
      return encodeSubArray(key, value);
    } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
      return encodeSubObject(key, value);
    } else {
      return esc(key) + '=' + esc(value);
    }
  }).join('&');
  return query;
};

exports.encodeParams = encodeParams;
