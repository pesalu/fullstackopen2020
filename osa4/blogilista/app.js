const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const cors = require('cors');
const bodyParser = require('body-parser')
const notesRouter = require('./controllers/blogs');

const app = express();

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use('/api/blogs', notesRouter);

module.exports = app;