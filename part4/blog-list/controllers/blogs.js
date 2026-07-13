const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const firstUser = await User.findOne({})
  let blog;
  if (!firstUser) {
    blog = new Blog(request.body)
  } else {
    blog = new Blog({
      ...request.body,
      user: firstUser._id,
    })
  }
  const entry = await blog.save()

  if (firstUser) {
    firstUser.blogs = firstUser.blogs.concat(entry._id)
  }
  await firstUser.save()

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
