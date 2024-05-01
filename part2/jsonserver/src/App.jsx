import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

    const hook = () => {
      console.log('effect')
      axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise resolved')
        setNotes(response.data)
      })
    }

    useEffect(hook, [])
    
    console.log('render', notes.length, 'notes');
  return (
    <>

    </>
  )
}

export default App
