const usersRouter = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = new User({
    username,
    hashedPassword,
    name,
  })

  const entry = await user.save()
  res.status(201).json(entry);
})

module.exports = usersRouter
