import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import api from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
      api
        .getAll()
        .then(data => setPersons(data));
  }, [])

  const filtered = persons.filter((person) => 
    person.name.toLowerCase().includes(filter.toLowerCase(), 0)
  );

  const handleFilter = (e) => {
    setFilter(e.target.value);
  }

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const person = persons.find((person) => person.name === newName);
    if (person) {
      if (confirm(`${newName} is already added to the phonebook, replcae the old number with a new one?`)) {
        api
          .update(newPerson, person.id)
          .then(data => {
            setPersons(persons.map((person) => person.id === data.id ? data : person));
          });
      }
    } else {
      api
        .create(newPerson)
        .then(data => {
          setPersons(persons.concat(data));
        });
    }
  }

  const handleDelete = (entry) => {
    if (confirm(`delete ${entry.name}?`)) {
      api
        .remove(entry)
        .then(setPersons(persons.filter(person => person.id != entry.id)));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter callback={handleFilter} />
      <h2>add a new</h2>
      <PersonForm cbSubmit={handleSubmit} cbName={handleNameInput} cbNumber={handleNumberInput} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} callback={handleDelete} />
    </div>
  )
}

export default App
