# fetch-rails
Use GitHub's [fetch](https://github.com/github/fetch) library with Ruby on Rails. Based heavily on [this wrapper](https://gist.github.com/dgraham/92e4c45da3707a3fe789) to encapsulate some of the callback handling of HTTP status codes.

## Installation

0. Make sure you have the [fetch](https://github.com/github/fetch) library added to your `app.js` manifest file.
1. Ensure your root layout file (usually called `app/views/layouts/application.html.erb`) has `<%= csrf_meta_tags %>` within the `<head>` tag.
2. Copy the `fetch-rails.js` to your `/vendor/assets/javascripts/` folder.
3. Add `//= require fetch-rails` directly below where you have added the fetch library to your `app.js` manifest.

## Usage

### HTML GET request

```javascript
Fetch.html( '/api/web/get-html' )
  .then( function( response ){
    document.body.innerHTML = response.data;
  });
```

### JSON GET request

```javascript
// endpoint returns { name: 'Adam', age: 30 }
Fetch.json( '/api/web/get-json' )
  .then( function( data ){
    this.name = data.name;
    this.age = data.age;
  });
```

### Text GET request

```javascript
Fetch.text( '/api/web/get-text' )
  .then( function( text ){
    document.querySelector( '.item' ).innerText = text;
  });
```

### Form POST request

```javascript
Fetch.post( '/api/web/submit-form', 'form.my-form' )
  .then( function( response ){
    document.querySelector( '.alert' ).innerText = 'Form submitted!';
  }).catch( function( error ){
    document.querySelector( '.alert' ).innerText = error;
  });
```

#### With file uploads

```javascript
Fetch.post( '/api/web/submit-form', 'form.my-form', 'input.file-uploader' )
  .then( function( response ){
    document.querySelector( '.alert' ).innerText = 'File uploaded!';
  }).catch( function( error ){
    document.querySelector( '.alert' ).innerText = error;
  });
```

### JSON POST request

```javascript
Fetch.postJSON( '/api/web/post-json', { name: 'Adam', age: 30 } )
  .then( function( response ){
    document.querySelector( '.alert' ).innerText = 'JSON submitted!';
  }).catch( function( error ){
    document.querySelector( '.alert' ).innerText = error;
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
