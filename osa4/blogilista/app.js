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

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

// Middlwares
app.use(middleware.errorHandler);
module.exports = app;