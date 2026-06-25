import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567',
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter callback={handleFilter} />
      <h2>add a new</h2>
      <PersonForm cbSubmit={handleSubmit} cbName={handleNameInput} cbNumber={handleNumberInput} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
