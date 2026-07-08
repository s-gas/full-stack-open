require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})

const errorHandler = (error, req, res, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    res.status(400).json({error: 'malformatted id'})
    return
  }
  if (error.name === 'ValidationError') {
    res.status(400).json({error: error.errors})
    return
  }
  next(error)
}

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then((people) => res.json(people))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person
    .findById(id)
    .then((person) => {
      if (person) res.json(person)
      else res.status(404).json({error: 'not found'})
    })
    .catch((error) => next(error)) //next with an argument jumps to the first error-handling middleware -> func(error, req, res, next)
})

app.post('/api/persons', (req, res, next) => {
  const entry = {...req.body}
  const person = new Person(entry)
  person
    .save()
    .then((result) => {
      res.status(201).json(result)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const entry = req.body
  const id = req.params.id
  Person
    .findByIdAndUpdate(id, entry, {new: true, runValidators: true})
    .then((person) => {
      if (person) {
        res.json(person)
      }
      else res.status(404).json({error: 'not found'})
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person
    .findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.get('/info', (req, res) => {
  Person.find({}).then((people) => {
    const numEntries = people.length
    const info = numEntries === 1 ? `Phonebook has info for ${numEntries} person` : `Phonebook has info for ${numEntries} people`
    res.send(
      `<div>${info}</div><div>${new Date().toString()}</div>` 
    )
  })
})

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`server listening at :${PORT}`)
})
