const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") return res.status(400).json({error: "malformatted"})
  if (error.name === "ValidationError") return res.status(400).json({error: "missing required fields"})
  if (error.code === 11000) return res.status(400).json({error: "username must be unique"})
  if (error.name === "JsonWebTokenError") return res.status(401).json({error: "invalid token"})

  next(error);
}

module.exports = errorHandler
