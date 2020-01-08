const notesRouter = require('express').Router();
const Blog = require('../models/blog');

notesRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

notesRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error));
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