import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Entries = ({persons, filter}) => {
  
  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <ul>
      {filteredPersons.map(p => {
        return <li key={p.id}>{p.name} {p.number}</li>
      })}
    </ul>
  )
}

const InputPerson = ({props, handler}) => {
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

    const checker = props.some(p => p.name === newName)
    
    if(checker){
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name : newName, number : newNumber, id : props.length + 1 }  
      handler(props.concat(newPerson))
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

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterWord, setFilterWord] = useState('')

  useEffect(() => {
    console.log('effect');
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise resolved')
      console.log(response.data)
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilterWord={setFilterWord}/>
      <h2>add a new person</h2>
      <InputPerson props={persons} handler={setPersons} />
      <h2>Numbers</h2>
      <Entries persons={persons} filter={filterWord} />
    </div>
  )
}

export default App
