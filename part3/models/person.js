const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;

mongoose
  .connect(url, { family: 4 })
  .then(() => console.log("connection to mongoDB successfull"))
  .catch(() => console.log("error: connection to mongoDB failed"));

const schema = new mongoose.Schema(
  {
    name: String,
    number: String,
  }
);

const Person = mongoose.model('Person', schema);

module.exports = Person;
