const getTokenFrom = require('./authentication_helper');

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token!'
    });
  }

  next(error)
}

const addTokenToFromAuthorizationHeaderRequest = (request, response, next) => {
  const token = getTokenFrom(request);
  request.token = token;
  next();
}

module.exports = {
  errorHandler,
  addTokenToFromAuthorizationHeaderRequest
}