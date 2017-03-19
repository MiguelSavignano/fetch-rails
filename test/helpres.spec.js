var assert          = require('assert')
var helpers         = require('../lib/helpers')
var encodeParams = helpers.encodeParams

describe('helpers', function () {
  describe('#encodeParams(params)', function () {
    // it('encode empty object or undefined', function () {
    //   var result = encodeParams("/api/users", {})
    //   assert.equal("", result)
    // })
    it('encode one key in object', function () {
      var result = encodeParams({page:2})
      assert.equal("page=2", result)
    })
    it('encode two keys in object', function () {
      var result = encodeParams({page:2, recomended:true})
      assert.equal("page=2&recomended=true", result)
    })
    // $.param({ q: { name: "Jhon", age: 20 } })
    it('encode json object deep in uri params', function () {
      var result = encodeParams({ q: {name: "Jhon", age:20 } })
      assert.equal("q%5Bname%5D=Jhon&q%5Bage%5D=20", result)
    })
    // $.param({ ids: [1, 2, 3] })
    it('encode array in uri params', function () {
      var result = encodeParams({ids: [1,2,3]})
      assert.equal("ids%5B%5D=1&ids%5B%5D=2&ids%5B%5D=3", result)
    })
  })
})