const mongoose = require('mongoose')

if (process.argv.length != 3 && process.argv.length != 5) {
  console.log('Usage: node <filename> <password> [new entry]')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://s-gas:${password}@cluster0.vchlnol.mongodb.net/?appName=Cluster0`

mongoose.connect(url, { family: 4 })

const schema = new mongoose.Schema(
  {
    name: String,
    number: String,
  }
)

const Person = mongoose.model('Person', schema)

if (process.argv.length == 5) {
  const [name, number] = process.argv.slice(3)
  const entry = new Person({name, number})
  entry.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
