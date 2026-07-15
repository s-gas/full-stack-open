const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({error: "invalid token"});
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(400).json({error: "user ID missing or invalid"});
  }
  let blog = new Blog({
      ...request.body,
      user: user._id,
  })
  const entry = await blog.save()

  user.blogs = user.blogs.concat(entry._id)
  
  await user.save()

  response.status(201).json(entry)
})

blogsRouter.put('/:id', async (request, response) => {
  const entry = await Blog.findByIdAndUpdate(request.params.id, request.body, {returnDocument: "after"})
  if (entry) response.json(entry)
  else response.status(404).json({error: "not found"})
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({error: "invalid token"});
  }
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({error: "not found"})
  }
  if (decodedToken.id.toString() !== blog.user.toString()) {
    return response.status(401).json({error: "not allowed"});
  }
  await blog.deleteOne();
  response.status(204).end()
})

module.exports = blogsRouter
