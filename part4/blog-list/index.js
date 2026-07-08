require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const app = express()

app.use(express.json());

const mongoUrl = process.env.MONGODB_URL;
mongoose
  .connect(mongoUrl, { family: 4 })
  .then(() => console.log("Connected to db"))
  .catch(() => console.log("Failed to connect to db"));

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
