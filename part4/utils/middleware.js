const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") return res.status(400).json({error: "malformatted"})
  if (error.name === "ValidationError") return res.status(400).json({error: "missing required fields"})
  if (error.code === 11000) return res.status(400).json({error: "username must be unique"})
  if (error.name === "JsonWebTokenError") return res.status(401).json({error: "invalid token"})

  next(error);
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = null;
  if (authorization && authorization.startsWith('Bearer ')) {
    token = authorization.slice(7);
  }
  req.token = token;
  next();
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, config.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({error: "invalid token"});
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).json({error: "user ID missing or invalid"});
  }
  req.user = user;
  next();
}

module.exports = { errorHandler, tokenExtractor, userExtractor }
