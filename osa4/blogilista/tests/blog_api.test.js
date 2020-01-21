const mongoose = require('mongoose');
const Blog = require('../models/blog');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const api = supertest(app);

const initialBlogs = [
  {
    'title': 'Pekka ihmemaassa',
    'author': 'Pekka Puurtimo',
    'url': 'booky.com',
    'likes': 1
  },
  {
    'title': 'Antti Kairossa',
    'author': 'Pekka Puurtimo Jr.',
    'url': 'aksu.net',
    'likes': 2
  }
];

const initialUsers = [
  {
    'username': 'pedro123',
    'name': 'Pedro',
    'password': 'salsa'
  },
  {
    'username': 'angelina777',
    'name': 'Angelina',
    "password": "kastike"
  },
];

const newUser = {
  username: 'mluukkai',
  name: 'Matti Luukkainen',
  password: 'salainen',
}

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();

  // Delete all users first
  await User.deleteMany({});

  const user = new User({ username: 'root', name: 'rootName', password: 'sekret' })
  await user.save();

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
});

test('all blogs are returned', async () => {
  let response = await api.get('/api/blogs');
  expect(response.body.length).toBe(initialBlogs.length);
});

test('the identifying field of blog is \'id\' ', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

test('a valid blog can be added ', async () => {
  console.log('New user ', newUser);

  const testBlog = {
    'title': 'Liisa Karjalassa',
    'author': 'Pekka von Puurtimo',
    'url': 'test.fi/1',
    'likes': 0
  };

  // Login first
  const token = await loginFirst();

  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(testBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const blogTitles = response.body.map(blog => blog.title)

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(blogTitles).toContain(
    'Liisa Karjalassa'
  );
});

test('set the value of \'likes\' in a blog to zero by default', async () => {
  const testBlogWithUndefinedLikes = {
    'title': 'Mathematics vol. 1',
    'author': 'Kari Kielonen',
    'url': 'booky.com',
    'likes': undefined
  };

  const token = await loginFirst();

  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(testBlogWithUndefinedLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/);


  const response = await api
    .get('/api/blogs')
    .set('Authorization', 'Bearer ' + token);
  const addedBlog = response.body.find(blog => blog.title === 'Mathematics vol. 1');
  expect(addedBlog.likes).toBe(0);
});

test('adding blog without title and url fails', async () =>  {
  const testBlogWithUndefinedLikes = {
    'title': undefined,
    'author': 'Kari Kielonen',
    'url': undefined,
    'likes': undefined
  };

  const token = await loginFirst();

  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(testBlogWithUndefinedLikes)
    .expect(400);
});

test('modifying likes of an existing blog', async () => {
  let response = await api.get('/api/blogs');
  const blog = response.body[0];
  const blogWithModifiedLikes = {
    likes: blog.likes + 200,
  }

  const putResponse = await api
    .put('/api/blogs/' + blog.id)
    .send(blogWithModifiedLikes)
    .expect(200);

  let modifiedBlog = putResponse.body;
  expect(modifiedBlog.likes).toBe(blog.likes + 200);
});


test('removing blog that has been added by the user', async () =>  {
  let response = await api.get('/api/blogs');
  const numberOfBlogs = response.body.length;
  console.log('BLOGS ', response.body)
  const blog = response.body[0];

  const token = await loginFirst();

  await api
    .delete('/api/blogs/' + blog.id)
    .set('Authorization', 'Bearer ' + token)
    .expect(200);

  response = await api.get('/api/blogs');
  const numberOfBlogs2 = response.body.length;
  expect( numberOfBlogs2 ).toBe( numberOfBlogs - 1 );
});

test('removing blog with invalid id fails', async () =>  {
  await api
    .delete('/api/blogs/' + '1232434')
    .expect(500);
});

afterAll(() => {
  mongoose.connection.close()
});

async function loginFirst() {
  const userResponse = await api
    .post('/api/login')
    .send(newUser);
  const token = userResponse.body.token;
  return token;
}
