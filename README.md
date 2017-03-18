# fetch-rails
Use GitHub's [fetch](https://github.com/github/fetch) library with Ruby on Rails. Based heavily on [this wrapper](https://gist.github.com/dgraham/92e4c45da3707a3fe789) to encapsulate some of the callback handling of HTTP status codes.

## Installation

0. Make sure you have the [fetch](https://github.com/github/fetch) library.
1. npm install fetch-rails --save

## Usage

### JSON GET request

```javascript
Fetch.json('https://jsonplaceholder.typicode.com/posts')
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
Fetch.html( '/api/web/get-html' )
  .then( function( response ){
    document.body.innerHTML = response.data;
  });
```

### Text GET request

```javascript
Fetch.text( '/api/web/get-text' )
  .then( function( text ){
    document.querySelector( '.item' ).innerText = text;
  });
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
