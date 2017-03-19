const merge = (object, otherObject) => Object.assign({}, object, otherObject)

const getCSRF = () => (
  document.querySelector('meta[name="csrf-token"]').getAttribute('content')
)

const mergeParameters = (url = "", params = {}) => {
  if (!params || params == {}) {
    return url
  }
  var esc = encodeURIComponent
  var query = Object.keys(params)
    .map(key => `${esc(key)}=${esc(params[key])}`)
    .join('&')
  return `${url}?${query}`
}

const defaultHeadersJSON = () => ({
  "X-Requested-With": 'XMLHttpRequest',
  'X-CSRF-Token': getCSRF(),
  'Accept': 'application/json',
  'Content-Type': 'application/json',
})

const defaultHeaders = () => ({
  "X-Requested-With": 'XMLHttpRequest',
  'X-CSRF-Token': getCSRF(),
})

const defaultCredentials = () => 'same-origin'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseJSON = response => response.json()

const parseText = response => response.text()

const Fetch = {
  json: (url, params) => {
    var url = mergeParameters(url, params)
    var options = {
      headers: defaultHeadersJSON(),
      credentials: defaultCredentials(),
    }
    return fetch(url, options).then(checkStatus).then(parseJSON)
  },
  postJSON: (url, body) => {
    var options = {
      headers: defaultHeadersJSON(),
      credentials: defaultCredentials(),
      method: 'post',
      body: JSON.stringify(body),
    }
    return fetch(url, options).then(checkStatus).then(parseJSON)
  },
  putJSON: (url, body) => {
    var options = {
      headers: defaultHeadersJSON(),
      credentials: defaultCredentials(),
      method: 'put',
      body: JSON.stringify(body),
    }
    return fetch(url, options).then(checkStatus).then(parseJSON)
  },
  deleteJSON: (url) => {
    var options = {
      headers: defaultHeadersJSON(),
      credentials: defaultCredentials(),
      method: 'delete',
    }
    return fetch(url, options).then(checkStatus).then(parseJSON)
  },
  html: (url, params) => {
    var url = mergeParameters(url, params)
    var options = {
      headers: defaultHeaders(),
      credentials: defaultCredentials(),
    }
    return fetch(url, options).then(checkStatus)
  },
  text: (url, options) => {
    var url = mergeParameters(url, params)
    var options = {
      headers: defaultHeaders(),
      credentials: defaultCredentials(),
    }
    return fetch(url, options).then(checkStatus).then(parseText)
  },
  postForm: (url, form) => {
    var options = {
      headers: defaultHeadersHTML(),
      credentials: defaultCredentials(),
      body: new FormData(document.querySelector(form)),
      method: 'post',
    }
    return fetch(url, options).then(checkStatus)
  }
}

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

export default Fetch