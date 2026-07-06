const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose
  .connect(url, { family: 4 })
  .then(() => console.log('connection to mongoDB successfull'))
  .catch(() => console.log('error: connection to mongoDB failed'))

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [ 3, 'Name must be at least 3 characters long' ],
      required: [ true, 'Name is required'],
    },
    number: {
      type: String,
      minLength: [ 8, 'Number must be at least 8 characters long' ],
      required: [ true, 'Number is required'],
      validate: {
        validator: function(v) {
          return /^\d{2,3}-\d+$/.test(v)
        },
        message: props => `${props.value} is not a valid number`
      },
    }
  }
)

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', schema)

module.exports = Person
