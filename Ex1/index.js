const storage = require('./storage')

storage.put('first', 'firstValue')
storage.put('second', 'secondValue')

let someValue = storage.get('first')
console.log(someValue)

storage.update('first', 'something else')
let anotherValue = storage.get('first')
console.log(anotherValue)

// storage.delete('first')

storage.clear()

storage.put('third', true)
storage.put('blabla', 1)

storage
  .save()
  .then(() => {storage.clear()
      
  storage
  .load()
  .then(() => {
    let afterLoadValue = storage.get('third')
    console.log(afterLoadValue)
  })
})



