const usersRouter = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {likes: 0, user: 0})
  res.json(users);
})

usersRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body;

  if (!username) {
    return res.status(400).json({error: "username is required"});
  }
  if (!password) {
    return res.status(400).json({error: "password is required"});
  }
  if (username.length < 3) {
    return res.status(400).json({error: "username must be at least 3 characters long"});
  }
  if (password.length < 3) {
    return res.status(400).json({error: "password must be at least 3 characters long"});
  }

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
