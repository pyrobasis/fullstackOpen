import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name : 'Paul Atreides' }
  ])
  const [newName, setNewName] = useState('')

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const submitPerson = (event) => {
    event.preventDefault()    

    const checker = persons.some(p => p.name === newName)
    
    if(checker){
      alert(`${newName} is already added to phonebook`)
    } else {
      console.log(checker, 'if false')
      const newPerson = { name : newName }  
      setPersons(persons.concat(newPerson))
    }

    setNewName('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitPerson}>
        <div>
          name: <input value={newName} onChange={handleNoteChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((p, i) => 
          <li key={p.name}>{p.name}</li>
        )}
      </ul>
    </div>
  )
}

export default App
