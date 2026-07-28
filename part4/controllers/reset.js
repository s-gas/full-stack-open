const resetRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

resetRouter.get('/', async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
})

module.exports = resetRouter
