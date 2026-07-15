const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  let blog = new Blog({
      ...request.body,
      user: request.user._id,
  })
  const entry = await blog.save()

  request.user.blogs = request.user.blogs.concat(entry._id)
  
  await request.user.save()

  response.status(201).json(entry)
})

blogsRouter.put('/:id', async (request, response) => {
  const entry = await Blog.findByIdAndUpdate(request.params.id, request.body, {returnDocument: "after"})
  if (entry) response.json(entry)
  else response.status(404).json({error: "not found"})
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({error: "not found"})
  }
  if (request.user.id.toString() !== blog.user.toString()) {
    return response.status(401).json({error: "not allowed"});
  }
  await blog.deleteOne();
  response.status(204).end()
})

module.exports = blogsRouter
