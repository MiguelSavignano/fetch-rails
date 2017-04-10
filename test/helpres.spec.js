var assert          = require('assert')
var helpers         = require('../lib/helpers')
var encodeParams = helpers.encodeParams

describe('helpers', function () {
  describe('#encodeParams(params)', function () {
    // $.param( { page: 2 } )
    it('encode object with one key', function () {
      var result = encodeParams({page:2})
      assert.equal("page=2", result)
    })
    // $.param( { page: 2, favourites: true } )
    it('encode object with two keys', function () {
      var result = encodeParams({page:2, favourites:true})
      assert.equal("page=2&favourites=true", result)
    })
    // $.param( { q: { name: "Jhon", age: 20 } } )
    it('encode json object with deep object', function () {
      var result = encodeParams({ q: {name: "Jhon", age:20 } })
      assert.equal("q%5Bname%5D=Jhon&q%5Bage%5D=20", result)
    })
    // $.param({ ids: [1, 2, 3] })
    it('encode array in uri params', function () {
      var result = encodeParams({ids: [1,2,3]})
      assert.equal("ids%5B%5D=1&ids%5B%5D=2&ids%5B%5D=3", result)
    })
    //$.param( { users: [ { name: "Jhon", age: 20 }, { name: "Jhon2", age: 25 } ] } )
    it('encode array of objects in uri params', function () {
      var result = encodeParams( { users: [ { name: "Jhon", age: 20 }, { name: "Jhon2", age: 25 } ] } )
      assert.equal("users%5B0%5D%5Bname%5D=Jhon&users%5B0%5D%5Bage%5D=20&users%5B1%5D%5Bname%5D=Jhon2&users%5B1%5D%5Bage%5D=25", result)
    })
  })
})