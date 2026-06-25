const Persons = ({persons, filter}) => {
  const filtered = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));

  return filtered.map((person) => <div key={person.name}>{person.name} {person.number}</div>);
}

export default Persons
