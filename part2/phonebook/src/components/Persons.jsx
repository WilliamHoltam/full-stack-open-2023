const Persons = ({ personsToShow, onDelete }) =>
    <ul>
        {personsToShow.map(
            person =>
                <div key={person.id}>{person.name} {person.number} <button onClick={() => onDelete(person.id)}>delete</button></div>
        )}
    </ul>

export default Persons
