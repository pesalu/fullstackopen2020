const getTokenFrom = request => {
  const authorization = request.get('Authorization');
  console.log('HEREE??', request);
  console.log('HEREE???', authorization);

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

module.exports = getTokenFrom;