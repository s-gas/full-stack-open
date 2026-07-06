const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;

mongoose
  .connect(url, { family: 4 })
  .then(() => console.log("connection to mongoDB successfull"))
  .catch(() => console.log("error: connection to mongoDB failed"));

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    number: {
      type: String,
      required: true,
    }
  }
);

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Person = mongoose.model('Person', schema);

module.exports = Person;
