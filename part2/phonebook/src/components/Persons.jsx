const Persons = ({ personsToShow }) =>
    <ul>
        {personsToShow.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
    </ul>

export default Persons
