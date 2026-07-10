const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const entry = await blog.save()
  response.status(201).json(entry)
})

blogsRouter.put('/:id', async (request, response) => {
  const entry = await Blog.findByIdAndUpdate(request.params.id, request.body, {returnDocument: "after"})
  if (entry) response.json(entry)
  else response.status(404).json({error: "not found"})
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
