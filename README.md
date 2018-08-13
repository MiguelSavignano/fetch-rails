# fetch-rails
![dockerize](https://img.shields.io/badge/weight-59kb-green.svg?longCache=true&style=flat)
Use GitHub's [fetch](https://github.com/github/fetch) library with Ruby on Rails. Based heavily on [this wrapper](https://gist.github.com/dgraham/92e4c45da3707a3fe789) to encapsulate some of the callback handling of HTTP status codes.
## Installation
```sh
npm install fetch-rails --save
```
## Javascript vainilla

* All responses in JSON
```javascript
fetch(url, options).then((response) => response.json()).catch((response) => response.json())
```
* GET with params
```javascript
// params = { q: { name: "Jhon" } }
fetch("apiUrl?q%5Bname%5D=Jhon", options).then((response) => response.json()).catch((response) => response.json())

```
* POST, PUT, DELETE request
```javascript
fetch(url, {
  method: 'POST',
  body: JSON.stringify(body),
}).then((response) => response.json()).catch((response) => response.json())
```

With fetch-rails, it's more simple and you can getCSRF, encodeParams, checkStatus, set default json headers, set default credentials, and you can override all of this.

global override
```javascript
import Fetch from "fetch-rails"
Fetch.defaultHeaders = () => ({
  "X-Requested-With": 'XMLHttpRequest',
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer 1234',
})
```
or override by request
```javascript
import Fetch from "fetch-rails"
Fetch.json("apiUrl", {}, {headers: { ...Fetch.defaultHeadersJSON, "Authorization": 'Bearer 1234'} })
```

## Usage

### JSON GET request

```javascript
Fetch.json('https://jsonplaceholder.typicode.com/posts')
  .then( function( posts ){
    console.log( posts ) // response in json
  });
```
Send params without encoding
```javascript
Fetch.json('https://jsonplaceholder.typicode.com/posts', { search: { name: "Jhon" }})
  .then( function( posts ){
    console.log( posts ) // response in json
  });
```

### JSON POST request

```javascript
Fetch.postJSON('https://jsonplaceholder.typicode.com/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1
  })
  .then( function( response ){
    console.log(response) // response in json
  }).catch( function( error ){
    console.log(error) // error in json
  });
```
### JSON PUT request

```javascript
Fetch.putJSON('https://jsonplaceholder.typicode.com/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1
  })
  .then( function( response ){
    console.log(response) // response in json
  }).catch( function( error ){
    console.log( error ) // error in json
  });
```
### JSON DELETE request

```javascript
Fetch.deleteJSON('https://jsonplaceholder.typicode.com/posts')
  .then( function( response ){
    console.log(response) // response in json
  }).catch( function( error ){
    console.log(error) // error in json
  });
```
### HTML GET request

```javascript
Fetch.html('/api/get-html')
  .then( function( response ){
    document.body.innerHTML = response.data;
  });
```

### Text GET request

```javascript
Fetch.text('/api/get-text')
  .then( function( text ){
    document.querySelector('.item').innerText = text;
  });
```
## Fetch.checkStatus
The checkStatus function return a Promise and parse the error in json.

```javascript
  import Fetch from 'fetch-rails'

  Fetch.postJSON('/comment', comment)
  .then( (comment) => {
    console.log(comment) // { text: "Hi", user_id:1, creted_at: "2017/03/03" }
  })
  .catch( (errors) => {
    console.log(errors)  // { text: ["can't be blank] }
  })

  function checkStatus(response) {
    return new Promise( (resolve, reject) => {
      if(response.status >= 200 && response.status < 300) {
        resolve(response)
      }else {
        response.json().then( (response_json) => {
          reject(response_json)
        })
      }
    })
  }
```

# You can override checkStatus function like this

```javascript
  import Fetch from 'fetch-rails'

  Fetch.checkStatus = myFunction
```

## Support

### Rails
* Rails 4.0+

### Browsers
* Chrome latest
* Safari latest
* Firefox latest
* Opera latest
* IE 9+
* Safari mobile latest
* Chrome mobile latest
