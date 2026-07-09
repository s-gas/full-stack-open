const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

mongoose
  .connect(config.MONGODB_URL, { family: 4 })
  .then(() => console.log("Connected to db"))
  .catch(() => console.log("Failed to connect to db"));

app.use(express.json());

app.use('/api/blogs', blogsRouter);

module.exports = app
