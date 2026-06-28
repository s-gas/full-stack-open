const express = require('express');
const app = express();

app.use(express.json());

let persons =
[
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const entry = persons.find((person) => person.id === id);
  if (!entry) {
    res.status(400).json({error: "not found"});
    return;
  }
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

const port = 3001;

app.listen(port, () => {
  console.log(`server listening at :${port}`);
});
