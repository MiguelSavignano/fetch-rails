"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fetch = {
    getCSRF: function () {
        var element = document.querySelector('meta[name="csrf-token"]');
        if (element) {
            return element.getAttribute('content');
        }
        else {
            return '';
        }
    },
    defaultHeadersJSON: function (options) {
        return (options.headers || {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': this.getCSRF(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        });
    },
    defaultHeaders: function (options) {
        if (options === void 0) { options = { headers: null }; }
        return (options.headers || {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': this.getCSRF(),
        });
    },
    defaultCredentials: function (options) {
        if (options === void 0) { options = { credentials: null }; }
        return options.credentials || 'same-origin';
    },
    checkStatus: function (response) {
        return new Promise(function (resolve, reject) {
            if (response.status >= 200 && response.status < 300) {
                resolve(response);
            }
            else {
                response.json().then(function (response_json) {
                    reject(response_json);
                });
            }
        });
    },
    json: function (url, params, options) {
        var url = mergeParameters(url, params);
        var options = {
            headers: this.defaultHeadersJSON(options),
            credentials: this.defaultCredentials(options),
        };
        return fetch(url, options)
            .then(this.checkStatus)
            .then(parseJSON);
    },
    requestDataJSON: function (method, url, body, options) {
        var options = {
            headers: this.defaultHeadersJSON(options),
            credentials: this.defaultCredentials(options),
            method: method,
            body: JSON.stringify(body),
        };
        return fetch(url, options)
            .then(this.checkStatus)
            .then(parseJSON);
    },
    postJSON: function (url, body, options) {
        return this.requestDataJSON('post', url, body, options);
    },
    putJSON: function (url, body, options) {
        return this.requestDataJSON('put', url, body, options);
    },
    deleteJSON: function (url, body, options) {
        return this.requestDataJSON('delete', url, body, options);
    },
    html: function (url, params, options) {
        var url = mergeParameters(url, params);
        var options = {
            headers: this.defaultHeaders(options),
            credentials: this.defaultCredentials(options),
        };
        return fetch(url, options).then(this.checkStatus);
    },
    text: function (url, options) {
        var url = mergeParameters(url, options);
        var options = {
            headers: this.defaultHeaders(options),
            credentials: this.defaultCredentials(options),
        };
        return fetch(url, options)
            .then(this.checkStatus)
            .then(parseText);
    },
    postForm: function (url, form, options) {
        var options = {
            headers: this.defaultHeadersHTML(options),
            credentials: this.defaultCredentials(options),
            body: new FormData(document.querySelector(form)),
            method: options.method || 'post',
        };
        return fetch(url, options).then(this.checkStatus);
    },
};
// helpers
var mergeParameters = function (url, params) {
    if (url === void 0) { url = ''; }
    if (params === void 0) { params = {}; }
    if (!params || Object.keys(params).length === 0) {
        return url;
    }
    var query = exports.encodeParams(params);
    return url + "?" + query;
};
var parseJSON = function (response) { return response.json(); };
var parseText = function (response) { return response.text(); };
exports.encodeParams = function (a) {
    var s = [], rbracket = /\[\]$/, isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }, add = function (k, v) {
        v =
            typeof v === 'function'
                ? v()
                : v === null
                    ? ''
                    : v === undefined
                        ? ''
                        : v;
        s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
    }, buildParams = function (prefix, obj) {
        var i, len, key;
        if (prefix) {
            if (isArray(obj)) {
                for (i = 0, len = obj.length; i < len; i++) {
                    if (rbracket.test(prefix)) {
                        add(prefix, obj[i]);
                    }
                    else {
                        buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i]);
                    }
                }
            }
            else if (obj && String(obj) === '[object Object]') {
                for (key in obj) {
                    buildParams(prefix + '[' + key + ']', obj[key]);
                }
            }
            else {
                add(prefix, obj);
            }
        }
        else if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                add(obj[i].name, obj[i].value);
            }
        }
        else {
            for (key in obj) {
                buildParams(key, obj[key]);
            }
        }
        return s;
    };
    return buildParams('', a)
        .join('&')
        .replace(/%20/g, '+');
};
exports.default = Fetch;
