import { useState, useEffect } from 'react'
import personServices from './services/persons'
import Entry from './components/Entry'
import './index.css'

const Filter = ({setFilterWord}) => {
  const [newSearch, setNewSearch] = useState('')
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    setFilterWord(event.target.value)
  }
  return (
    <div>
    filter shown with <input value={newSearch} onChange={handleSearchChange} />
    </div>
  )
}

const Entries = ({persons, filter, personsSetter }) => {
  console.log(persons)
  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
  
  const handleDeleteButton = async (id) => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name}?`))
      personsSetter(await personServices.remove(id).then(() => personServices.getAll().then(result => result)))
  }

  return (
    <ul>
      <Entry persons={filteredPersons} clickHandler={handleDeleteButton} />
    </ul>
  )
}

const InputPerson = ({props, setPersons, errormsgSetter, notificationStyle, setNotificationStyle}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const submitPerson = (event) => {
    event.preventDefault()
    
    const checker = props.find(p => p.name === newName ? p.id : false)

    if(checker){
      if(window.confirm(`${newName} is already added to phonebook. Do you want to update their phone number?`)){
        const updatedPerson = { ...checker, number : newNumber }
        personServices.update(checker.id, updatedPerson).then(response => {
          setPersons(props.map(person => person.id !== checker.id ? person : response))

          errormsgSetter(`Updated ${checker.name}'s number`)
          setNotificationStyle({...notificationStyle, display:'block'})
          setTimeout(() => {
            setNotificationStyle({...notificationStyle, display:'none'})
          }, 5000);
        }).catch(error => {
          const originalNotificationStyle = {...notificationStyle}
          errormsgSetter(`${checker.name} has already been removed from the server.`)
          setNotificationStyle({...notificationStyle, display:'block', color:'red'})

          setTimeout(() => {
            setNotificationStyle(originalNotificationStyle)
            errormsgSetter(null)
          }, 5000);
          setPersons(props.filter(person => person.id !== checker.id))
        })
      }
    } else {
      const newPerson = { name : newName, number : newNumber, id : `${props.length + 1}` }
      personServices.create(newPerson).then((response) => setPersons(props.concat(response)))
      errormsgSetter(`Added ${newName}`)
      setTimeout(() => {
        errormsgSetter(null)
      }, 5000);
    }

    setNewName('')
    setNewNumber('')

  }


  return (
  <form onSubmit={submitPerson}>
    <div>
      name: <input value={newName} onChange={handleNoteChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}

const Notification = ({message, notificationStyle}) => {
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterWord, setFilterWord] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState({
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    display: 'none'
})

  useEffect(() => {
    console.log('effect'),
    personServices.getAll().then((response) => setPersons(response))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} notificationStyle={notificationStyle} />
      <Filter setFilterWord={setFilterWord}/>
      <h2>add a new person</h2>
      <InputPerson props={persons} setPersons={setPersons} errormsgSetter={setErrorMessage} notificationStyle={notificationStyle} setNotificationStyle={setNotificationStyle} />
      <h2>Numbers</h2>
      <Entries persons={persons} filter={filterWord} personsSetter={setPersons} />
    </div>
  )
}

export default App
