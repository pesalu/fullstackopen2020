const mongoose = require('mongoose');
const User = require('../models/user');
const helper = require('./test_helper');

const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);


//...

describe('when there is a created user at db', () => {
  beforeEach(async () => {
    // Delete all users first
    await User.deleteMany({});

    const user = new User({ username: 'root', name: 'rootName', password: 'sekret' })
    await user.save();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('login is successfull with correct username and password', async () => {
    const user = {
      username: 'mluukkai',
      password: 'salainen',
    };

    const result = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('login is fails with incorrect password', async () => {
    const user = {
      username: 'mluukkai',
      password: 'salainen2',
    };

    const result = await api
      .post('/api/login')
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });

  test('login is fails with incorrect username', async () => {
    const user = {
      username: 'mluukkai2',
      password: 'salainen',
    };

    const result = await api
      .post('/api/login')
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
    mongoose.connection.close()
});