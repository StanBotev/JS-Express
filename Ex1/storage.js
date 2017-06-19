const fs = require('fs')
const dataFile = 'storage.dat'
let data = {}

let validateIfString = (key) => {
    if (typeof(key) != 'string') {
      throw new Error('Key must be a string!')
  }
}
let validataKeyExists = (key) => {
    if (!data.hasOwnProperty(key)){
      throw new Error ('Key not found')
  }
}

let put = (key, value) => {
  validateIfString(key)
  if (data.hasOwnProperty(key)) {
      throw new Error('Key already exists')
  }
  data[key] = value
//   console.log(data)
}

let get = (key) => {
  validateIfString(key)
  validataKeyExists(key)
  return data[key]
}

let update = (key, value) => {
 validateIfString(key)
 validataKeyExists(key)

 data[key] = value
}

let deleteItem = () => {
 validateIfString(key)
 validataKeyExists(key)

 delete(data[key])
}

let clear = () => {
  data = {}
}

// let save = () => {
//   let dataString = JSON.stringify(data)
//   fs.writeFileSync(dataFile, dataString)
// }


let save = (callback) => {
    return new Promise((resolve, reject) => {
  let dataString = JSON.stringify(data)
  fs.writeFile(dataFile, dataString, (err) => {
   if (err) {
       reject(err)
       return
   }
   resolve()
  })
})
}

let load = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFile, 'utf8', (err, dataJson) => {
      if(err) {
          reject(err)
          return
      }

      data = JSON.parse(dataJson)
      resolve()
    })
  })
}

module.exports = {
    put: put,
    get: get,
    update: update,
    delete: deleteItem,
    clear: clear,
    save: save,
    load: load
}