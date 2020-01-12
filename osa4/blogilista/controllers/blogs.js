const notesRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

notesRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()))
});

notesRouter.post('/', async (request, response, next) => {
  const blog = request.body;

  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
  });

  let user = undefined;
  if (blog.userId) {
    user = await User.findById(blog.userId);
    newBlog.user = user ? user._id : undefined;
  }

  try {
    const savedNote = await newBlog.save();
    console.log('USER ', user);
    if (user) {
      user.blogs = user.blogs.concat(savedNote._id);
      await user.save();
    }
    response.status(201).json(savedNote);
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