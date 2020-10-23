const notesRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const getTokenFrom = require('../utils/authentication_helper');
const config = require('../utils/config');
const Blog = require('../models/blog');
const User = require('../models/user');

notesRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({})
      .lean()
      .populate('user', { username: 1, name: 1 })
      .map(blogs => {
        procBlogs = blogs.map(blog => processBlog(blog));
        return procBlogs;
      });

    const user = await getRequester(request);

    let blogs2 = enrichWithPermissionsOfBlogs(blogs, user);

    response.json(blogs2);
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

notesRouter.post('/:id/comment', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);
    blog.comments.push(request.body.comment);
    await blog.save();
    response.json(blog);
  } catch (error) {
    next(error);
  }
});

notesRouter.post('/', async (request, response, next) => {
  const blog = request.body;
  console.log('blog ', blog)

  try {
    const user = await getRequester(request);

    console.log('USR ', user)
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

    let newSavedBlog = await Blog.findById(savedBlog._id)
      .lean()
      .populate('user', { username: 1, name: 1 })
      .map(blog => processBlog(blog));

    newSavedBlog = enrichWithPermissions(newSavedBlog, user);
    response.status(201).json(newSavedBlog);
  } catch (error) {
    next(error);
  }

});

const enrichWithPermissionsOfBlogs = (blogs, user) => {
  if (!user) {
    console.log('User is not defined. Cannot do permission enriching.')
    return blogs;
  }
  return blogs.map(blog => {
    return enrichWithPermissions(blog, user);
  });
};

const enrichWithPermissions = (blog, user) => {
  blog.canRemove = (blog.user ? (blog.user.username === user.username) : false);
  return blog;
};

function processBlog(blog) {
  delete blog.__v;
  blog.id = blog._id;
  delete blog._id;
  return blog;
}

async function getRequester(request) {
  if (!request.token) {
    console.log('Request has no token, cannot do decoding. Return null.')
    return null;
  }
  const decodedToken = await getDecodedToken(request);
  const user = await User.findById(decodedToken.id);
  return user;
}

async function getDecodedToken(request) {
  try {
    let decodedToken = null;
    if(request.token) {
      decodedToken = await jwt.verify(request.token, config.SECRET);
    } else {
      return null;
    }

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    return decodedToken;
  } catch( error ) {
    console.log('getDecodedToken ERROR ', error);
  }
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
    const decodedToken = await getDecodedToken(request);
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