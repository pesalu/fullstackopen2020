const notesRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const getTokenFrom = require('../utils/authentication_helper');
const config = require('../utils/config');
const Blog = require('../models/blog');
const User = require('../models/user');

notesRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()))
});

notesRouter.post('/', async (request, response, next) => {
  const blog = request.body;

  try {
    const token = getTokenFrom(request);
    console.log('TOKEN ', token);
    const decodedToken = jwt.verify(token, config.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: user._id
    });
    console.log('USER ', user);

    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }

});

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const blogWithNewData = {
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blogWithNewData,
      { new: true }
    );
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndRemove(request.params.id);
    response.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;