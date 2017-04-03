const isEmptyObject = (obj) => Object.keys(obj).length === 0

const encodeSubObject = (key, subObject) => {  
  var esc = encodeURIComponent
  return Object.keys(subObject).map(subKey => {
    let subValue = subObject[subKey]
    return `${key}%5B${esc(subKey)}%5D=${esc(subValue)}`
  }).join("&")
}

const encodeSubArray = (key, subArray) => {  
  return subArray.map(_value => {
    if (typeof value == 'object') {
      encodeSubObject()
    }else{
      return `${key}%5B%5D=${_value}`
    }
  }).join('&')
}

const encodeParams = (params) => {
  var esc = encodeURIComponent
  var query = Object.keys(params)
    .map(key => {
      let value = params[key]
      if (Array.isArray(value)){
        return encodeSubArray(key, value)
      } else if (typeof value == 'object'){
        return encodeSubObject(key, value)
      }else{
        return `${esc(key)}=${esc(value)}`
      }
    })
    .join('&')
  return query
}

export { encodeParams }