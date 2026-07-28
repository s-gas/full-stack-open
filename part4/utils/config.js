require('dotenv').config()

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const SECRET = process.env.SECRET;
const NODE_ENV = process.env.NODE_ENV;

module.exports = { PORT, MONGODB_URL, SECRET, NODE_ENV }
