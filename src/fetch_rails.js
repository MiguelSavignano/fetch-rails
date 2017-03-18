const headers = (options = {}) => {
  options.headers = {}
  options.headers['X-Requested-With'] = 'XMLHttpRequest'
  options.headers['X-CSRF-Token'] = getCSRF()
  return options
}

const getCSRF = () => (
  document.querySelector('meta[name="csrf-token"]').getAttribute('content')
)

const credentials = options => {
  if (options == null) options = {}
  if (options.credentials == null) options.credentials = 'same-origin'
  return options
}

const status = response => {
  if (response.ok) {
    return response
  } else {
    var error = new Error(response.statusText || response.status)
    error.response = response
    throw error
  }
}

const json = response => response.json()

const text = response => response.text()

const Fetch = {
  json: (url, options) => {
    options = headers(credentials(options))
    options.headers['Accept'] = 'application/json'
    options.headers['Content-Type'] = 'application/json'
    return fetch(url, options).then(status).then(json)
  },
  postJSON: (url, body, options) => {
    options = headers(credentials(options))
    options.body = JSON.stringify(body)
    options.headers['Accept'] = 'application/json'
    options.headers['Content-Type'] = 'application/json'
    options.method = 'post'
    return fetch(url, options).then(status).then(json)
  },
  putJSON: (url, body, options) => {
    options = headers(credentials(options))
    options.body = JSON.stringify(body)
    options.headers['Accept'] = 'application/json'
    options.headers['Content-Type'] = 'application/json'
    options.method = 'put'
    return fetch(url, options).then(status).then(json)
  }, 
  deleteJSON: (url, body, options) => {
    options = headers(credentials(options))
    options.body = JSON.stringify(body)
    options.headers['Accept'] = 'application/json'
    options.headers['Content-Type'] = 'application/json'
    options.method = 'delete'
    return fetch(url, options).then(status).then(json)
  }, 
  html: (url, options) => (
    fetch(url, headers(credentials(options))).then(status)
  ),
  text: (url, options) => (
    fetch(url, headers(credentials(options))).then(status).then(text)
  ),
  postForm: (url, form, options) => {
    options = headers(credentials(options))
    options.body = new FormData(document.querySelector(form))
    options.method = 'post'
    return fetch(url, options).then(status)
  },
  uploadFile: (url, form, file, options) => {
    var data = new FormData(document.querySelector(form))
    data.append('file', file.files[0])
    options = headers(credentials(options))
    options.body = data
    options.method = 'post'
    return fetch(url, options).then(status)
  },
}

export default Fetch