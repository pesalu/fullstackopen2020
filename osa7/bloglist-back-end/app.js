const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const cors = require('cors');
const bodyParser = require('body-parser')
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware');

const app = express();

mongoose.connect(config.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true });

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());

// Middleware before routes
app.use(middleware.addTokenToFromAuthorizationHeaderRequest);

// Routes
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/router-for-e2e-tests');
  app.use('/api/testing', testingRouter);
}

// Middlewares after routes
app.use(middleware.errorHandler);

module.exports = app;