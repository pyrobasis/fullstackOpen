import { useState } from 'react'

const Entries = ({props}) => {
  console.log(props);
  return (
    <ul>
      {props.map(p => {
        return <li key={p.id}>{p.name} {p.number}</li>
      })}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const submitPerson = (event) => {
    event.preventDefault()    

    const checker = persons.some(p => p.name === newName)
    
    if(checker){
      alert(`${newName} is already added to phonebook`)
    } else {
      console.log(checker, 'if false')
      const newPerson = { name : newName, number : newNumber }  
      setPersons(persons.concat(newPerson))
    }

    setNewName('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newSearch} onChange={handleSearchChange} />
      </div>
      <h2>add a new person</h2>
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
      </form>
      <h2>Numbers</h2>
      <Entries props={persons.filter(p => p.name.toLowerCase().includes(newSearch.toLowerCase()))} />
    </div>
  )
}

export default App
