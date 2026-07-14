const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
  const {username, password} = req.body;

  console.log(username)
  console.log(password)
})

module.exports = loginRouter;
