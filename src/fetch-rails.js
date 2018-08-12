const Fetch = {
  getCSRF: function() {
    let element = document.querySelector('meta[name="csrf-token"]')
    if (element) {
      return element.getAttribute('content')
    } else {
      return ""
    }
  },
  defaultHeadersJSON: function() { return {
    "X-Requested-With": 'XMLHttpRequest',
    'X-CSRF-Token': this.getCSRF(),
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }},
  defaultHeaders: function() { return {
    "X-Requested-With": 'XMLHttpRequest',
    'X-CSRF-Token': this.getCSRF(),
  }},
  defaultCredentials = () => 'same-origin',
  checkStatus: (response) => {
    return new Promise( (resolve, reject) => {
      if(response.status >= 200 && response.status < 300) {
        resolve(response)
      }else{
        response.json().then( (response_json) => {
          reject(response_json)
        })
      }
    })
  },
  json: function(url, params) {
    var url = mergeParameters(url, params)
    var options = {
      headers: this.defaultHeadersJSON(),
      credentials: this.defaultCredentials(),
    }
    return fetch(url, options).then(Fetch.checkStatus).then(parseJSON)
  },
  postJSON: function(url, body) {
    var options = {
      headers: this.defaultHeadersJSON(),
      credentials: this.defaultCredentials(),
      method: 'post',
      body: JSON.stringify(body),
    }
    return fetch(url, options).then(Fetch.checkStatus).then(parseJSON)
  },
  putJSON: function(url, body) {
    var options = {
      headers: this.defaultHeadersJSON(),
      credentials: this.defaultCredentials(),
      method: 'put',
      body: JSON.stringify(body),
    }
    return fetch(url, options).then(Fetch.checkStatus).then(parseJSON)
  },
  deleteJSON: function(url) {
    var options = {
      headers: this.defaultHeadersJSON(),
      credentials: this.defaultCredentials(),
      method: 'delete',
    }
    return fetch(url, options).then(Fetch.checkStatus).then(parseJSON)
  },
  html: function(url, params) {
    var url = mergeParameters(url, params)
    var options = {
      headers: defaultHeaders(),
      credentials: this.defaultCredentials(),
    }
    return fetch(url, options).then(Fetch.checkStatus)
  },
  text: function(url, options) {
    var url = mergeParameters(url, params)
    var options = {
      headers: this.defaultHeaders(),
      credentials: this.defaultCredentials(),
    }
    return fetch(url, options).then(Fetch.checkStatus).then(parseText)
  },
  postForm: function(url, form)  {
    var options = {
      headers: this.defaultHeadersHTML(),
      credentials: this.this.defaultCredentials(),
      body: new FormData(document.querySelector(form)),
      method: 'post',
    }
    return fetch(url, options).then(Fetch.checkStatus)
  }
}

// helpers
const mergeParameters = (url = "", params = {}) => {
  if (!params || Object.keys(params).length === 0) {
    return url
  }
  const query = encodeParams(params)
  return `${url}?${query}`
}

const parseJSON = response => response.json()

const parseText = response => response.text()

export const encodeParams = function(a) {
  var s = [],
    rbracket = /\[\]$/,
    isArray = function(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    },
    add = function(k, v) {
      v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
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
              buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i]);
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
}

export default Fetch
