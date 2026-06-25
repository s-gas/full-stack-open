const Persons = ({persons, filter, callback}) => {
  const filtered = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));

  return filtered.map((person) => (
    <div key={person.id}>{person.name} {person.number}
      <button onClick={() => callback(person)}>delete</button>
    </div>
  ));
}

export default Persons
