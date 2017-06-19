module.exports = {
  handleMongooseError: (err) => {
    let firstKey = Object.keys(err.errors)[0]
    let errorMsg = err.errors[firstKey].message

    return errorMsg
  }
}
