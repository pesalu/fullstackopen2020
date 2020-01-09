const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  if (error.name === 'MongoError') {
    if (error.message && error.message.includes('duplicate key error collection')) {
      return response.status(400).json({ error: 'username is already in use!' });
    }
  }

  next(error)
}

module.exports = {
  errorHandler
}