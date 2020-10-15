const passwordIsValid = (password) => {
  return password && password.length >= 3;
};

module.exports = passwordIsValid;