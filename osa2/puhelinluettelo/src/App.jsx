import {useState, useEffect} from "react"
import axios from "axios"
import "./style.css"

const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const ErrorNotification = ({message}) => {
  if (!message) return null
  return <div className="errorNotification">{message}</div>
}

const Notification = ({ message }) => {
  if (!message) return null
  return <div className="notification">{message}</div>
}

const postData = (person, persons, setPersons, setNewName, setNewNumber, setNotification) => {
  axios
    .post('http://localhost:3001/persons', person)
    .then(response => {
      console.log(response)
      setPersons(persons.concat(response.data))
      setNewName("")
      setNewNumber("")
      setNotification(`Added ${response.data.name}`)
      setTimeout(() => setNotification(null), 5000)
    })
}

const handleDelete = (id, persons, setPersons, setNotification, setErrorNotification) => {
  const personToDelete = persons.find(p => p.id === id)
  if (!personToDelete) return

  if (window.confirm(`Delete ${personToDelete.name}?`)) {
    axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
        setNotification(`Deleted ${response.data.name}`)
        setTimeout(() => setNotification(null), 5000)
      })
      .catch(() => {
        setErrorNotification(`Information of ${personToDelete.name} has already been removed from the server`)
        setTimeout(() => setErrorNotification(null), 5000)
      })
  }
}

const Filter = ({
  newFilter,
  handleFilterChange}) => {
  return(
    <div>
      filter shown with: <input value={newFilter} onChange={handleFilterChange}></input>
    </div>
  )
}

const PersonForm = ({
  persons,
  setPersons,
  setNewName,
  setNewNumber,
  newFilter,
  newName,
  newNumber,
  handleFilterChange,
  handleNameChange,
  handleNumberChange,
  setNotification}) => {
  const handleSubmit = ( event ) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if (persons.some(p => p.name === newName)) {
      if (persons.some(p => p.number === newNumber)) {
        alert(`${newName} is already in the phonebook`)
      } else {
        const oldPerson = persons.find(p => p.name === newName)
        const updatedPerson = { ...oldPerson, number: newNumber }

        if (window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )) {
          axios
            .put(`http://localhost:3001/persons/${oldPerson.id}`, updatedPerson)
            .then(response => {
              setPersons(persons.map(p => p.id !== oldPerson.id ? p : response.data))
              setNotification(`number: ${newNumber} changed`)
              setTimeout(() => setNotification(null), 5000)
            })
        }
      }
    } else {
      postData(person, persons, setPersons, setNewName, setNewNumber, setNotification)
    }
  }

  return (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      phone number: <input value={newNumber} onChange={handleNumberChange}></input>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({
  persons,
  newFilter,
  setPersons,
  setNotification,
  setErrorNotification
}) => {
  return (
    <p>
      {persons
        .filter(p =>
          p.name.toLowerCase().includes(newFilter.toLowerCase()) ||
          p.number.includes(newFilter)
        )
        .map((p, id) => (
          <li key={id}>{p.name} {p.number} <button onClick={() => handleDelete(p.id, persons, setPersons, setNotification, setErrorNotification)}>delete</button></li>
      ))}
    </p>
  )
}

const App = () => {  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [notification, setNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
    }, [])

  const handleNameChange = ( event ) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = ( event ) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = ( event ) => {
    setNewFilter(event.target.value)
    console.log(newFilter)
  }

  return (
    <div>
      <ErrorNotification message={errorNotification}/>
      <Notification message={notification}/>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm 
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newFilter={newFilter} 
        handleFilterChange={handleFilterChange}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        notification={notification}
        setNotification={setNotification}
        />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        newFilter={newFilter}
        setPersons={setPersons}
        setNotification={setNotification}
        setErrorNotification={setErrorNotification}/>
    </div>
  )
}

export default App