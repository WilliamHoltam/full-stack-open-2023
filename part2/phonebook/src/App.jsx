import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPersons => {
            setPersons(persons.map(person => person.name !== newName ? person : changedPerson))
          })
          .then(notification => {
            setNotificationMessage(
              `Added ${newName}`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.name !== newName))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .then(notification => {
          setNotificationMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const handleDelete = id => {
    if (window.confirm(`Delete ${persons.filter(person => person.id === id).map(person => person.name)}?`)) {
      personService
        .remove(id)
        .then(
          setPersons(persons.filter(person => person.id !== id))
        )
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = !newFilter
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type='notification' />
      <Notification message={errorMessage} type='error' />
      <Filter value={newFilter} onChange={handleNewFilter} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addName}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onDelete={handleDelete} />
    </div >
  )
}

export default App
