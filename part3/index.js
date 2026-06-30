require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');
const app = express();

app.use(express.static('dist'));
app.use(express.json());

morgan.token('body', function (req) {
  return JSON.stringify(req.body);
})

const persons = [];

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => res.json(people));
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person
    .findById(id)
    .then((person) => res.json(person))
    .catch((error) => res.json(error));
});

app.post("/api/persons", (req, res) => {
  const entry = {...req.body};
  if (!entry.name || !entry.number) {
    res.status(400).json({error: "name or number cannot be empty"});
    return;
  }
  if (persons.find((person) => person.name === entry.name)) {
    res.status(409).json({error: "name must be unique"});
    return;
  }
  if (!entry.id) entry.id = Math.floor(Math.random() * 1000000).toString();
  persons = persons.concat(entry);
  res.json(entry);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.get("/info", (req, res) => {
  const numEntries = persons.length;
  const info = numEntries === 1 ? `Phonebook has info for ${numEntries} person` : `Phonebook has info for ${numEntries} people`;
  res.send(
  `<div>${info}</div><div>${new Date().toString()}</div>` 
  )
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server listening at :${PORT}`);
});
