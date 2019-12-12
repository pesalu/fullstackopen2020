const mongoose = require('mongoose');
const Blog = require('../models/blog');
const supertest = require('supertest');
const app = require('../app');

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

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
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
  const testBlog = {
    'title': 'Liisa Karjalassa',
    'author': 'Pekka von Puurtimo',
    'url': 'test.fi/1',
    'likes': 0
  };

  await api
    .post('/api/blogs')
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

  await api
    .post('/api/blogs')
    .send(testBlogWithUndefinedLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const addedBlog = response.body.find(blog => blog.title === 'Mathematics vol. 1');
  console.log('addedBlog ', addedBlog);
  expect(addedBlog.likes).toBe(0);
});

test('adding blog without title and url fails', async () =>  {
  const testBlogWithUndefinedLikes = {
    'title': undefined,
    'author': 'Kari Kielonen',
    'url': undefined,
    'likes': undefined
  };

  await api
    .post('/api/blogs')
    .send(testBlogWithUndefinedLikes)
    .expect(400);
});

afterAll(() => {
  mongoose.connection.close()
});