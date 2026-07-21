const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const {username, password} = req.body;

  const user = await User.findOne({username})

  if (!user) {
    return res.status(401).json({error: "invalid username"});
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordCorrect) {
    return res.status(401).json({error: "invalid password"});
  }

  const tokenPayload = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(tokenPayload, config.SECRET);

  res.json({token, username: user.username, name: user.name});
})

module.exports = loginRouter;
