interface IDefaultOptions {
  headers: any;
  credentials: any;
}
interface IJSONOptions {
  headers: any;
  credentials: any;
  method: string;
  body: string;
}

const Fetch = {
  getCSRF: function() {
    let element = document.querySelector('meta[name="csrf-token"]');
    if (element) {
      return element.getAttribute('content');
    } else {
      return '';
    }
  },
  defaultHeadersJSON: function(options) {
    return (
      options.headers || {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': this.getCSRF(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    );
  },
  defaultHeaders: function(options = { headers: null }) {
    return (
      options.headers || {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': this.getCSRF(),
      }
    );
  },
  defaultCredentials: (options = { credentials: null }) =>
    options.credentials || 'same-origin',
  checkStatus: (response): Promise<object> => {
    return new Promise((resolve, reject) => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        response.json().then(response_json => {
          reject(response_json);
        });
      }
    });
  },
  json: function(url: string, params: object, options: IDefaultOptions) {
    var url = mergeParameters(url, params);
    var options = {
      headers: this.defaultHeadersJSON(options),
      credentials: this.defaultCredentials(options),
    };
    return fetch(url, options)
      .then(this.checkStatus)
      .then(parseJSON);
  },
  requestDataJSON: function(
    method: string,
    url: string,
    body: object,
    options: IJSONOptions,
  ) {
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
  postJSON: function(url: string, body: object, options: IJSONOptions) {
    return this.requestDataJSON('post', url, body, options);
  },
  putJSON: function(url: string, body: object, options: IJSONOptions) {
    return this.requestDataJSON('put', url, body, options);
  },
  deleteJSON: function(url: string, body: object, options: IJSONOptions) {
    return this.requestDataJSON('delete', url, body, options);
  },
  html: function(url: string, params: object, options: IDefaultOptions) {
    var url = mergeParameters(url, params);
    var options = {
      headers: this.defaultHeaders(options),
      credentials: this.defaultCredentials(options),
    };
    return fetch(url, options).then(this.checkStatus);
  },
  text: function(url: string, options: IDefaultOptions) {
    var url = mergeParameters(url, options);
    var options = {
      headers: this.defaultHeaders(options),
      credentials: this.defaultCredentials(options),
    };
    return fetch(url, options)
      .then(this.checkStatus)
      .then(parseText);
  },
  postForm: function(
    url: string,
    form,
    options: { headers: any; credentials: any; body: FormData; method: any },
  ) {
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
const mergeParameters = (url = '', params = {}) => {
  if (!params || Object.keys(params).length === 0) {
    return url;
  }
  const query = encodeParams(params);
  return `${url}?${query}`;
};

const parseJSON = response => response.json();

const parseText = response => response.text();

export const encodeParams = function(a): any {
  var s = [],
    rbracket = /\[\]$/,
    isArray = function(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    },
    add = function(k, v) {
      v =
        typeof v === 'function'
          ? v()
          : v === null
          ? ''
          : v === undefined
          ? ''
          : v;
      s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
    },
    buildParams = function(prefix, obj) {
      var i, len, key;

      if (prefix) {
        if (isArray(obj)) {
          for (i = 0, len = obj.length; i < len; i++) {
            if (rbracket.test(prefix)) {
              add(prefix, obj[i]);
            } else {
              buildParams(
                prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']',
                obj[i],
              );
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

  return buildParams('', a)
    .join('&')
    .replace(/%20/g, '+');
};

export default Fetch;
