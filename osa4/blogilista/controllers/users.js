const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

const passwordIsValid = require('../utils/validation_helper');

usersRouter.get('/', async (request, response, next) => {
  try {
    User
      .find({})
      .then(users => {
        response.json(users.map(u => u.toJSON()));
      });
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if(!passwordIsValid(body.password)) {
      console.log('BODY  ', body);
      response.status(400).send({ error: 'invalid password!' });
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (exception) {
    next(exception)
  }

});

module.exports = usersRouter