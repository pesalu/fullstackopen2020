const notesRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const getTokenFrom = require('../utils/authentication_helper');
const config = require('../utils/config');
const Blog = require('../models/blog');
const User = require('../models/user');

notesRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs.map(blog => blog.toJSON()));
  } catch (error) {
    next(error);
  }
});


notesRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);
    response.json(blog);
  } catch (error) {
    next(error);
  }
});



notesRouter.post('/', async (request, response, next) => {
  const blog = request.body;

  try {
    const decodedToken = getDecodedToken(request);

    const user = await User.findById(decodedToken.id);

    const newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: user._id
    });

    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }

});

const getDecodedToken = (request) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  return decodedToken;
}

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
    const decodedToken = getDecodedToken(request);
    const blogToBeRemoved = await Blog.findById(request.params.id);

    if (blogToBeRemoved && blogToBeRemoved.user && blogToBeRemoved.user.toString() === decodedToken.id) {
      const removedBlog = await Blog.findByIdAndRemove(request.params.id);
      response.status(200).end();
    } else if (!blogToBeRemoved) {
      return response.status(401).json({ error: 'blog not found by id' });
    } else {
      return response.status(401).json({ error: 'not authorized to remove this blog' });
    }

  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;