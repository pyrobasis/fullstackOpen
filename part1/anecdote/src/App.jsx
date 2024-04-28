import { useState } from 'react'

function App() {

  const data = [
    { quote: 'If it hurts, do it more often.',
      votes: 0 },
    { quote: 'Adding manpower to a late software project makes it later!',
      votes: 0 },
    { quote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0 },
    { quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0 },
    { quote: 'Premature optimization is the root of all evil.',
      votes: 0 },
    { quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0 },
    { quote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      votes: 0 },
    { quote: 'The only way to go fast, is to go well.',
      votes: 0 }
  ]

  const [anecdotes, setAnecdote] = useState(data)
  const [selected, setSelected] = useState(0)
  const [winnerQuote, setWinner] = useState(0)
  
  const selectButton = () => {
    let number = Math.round(Math.random() * 7)
    console.log(number)
    setSelected(number)
  }

  const voteQuote = () => {
    const copy = [...anecdotes]
    copy[selected].votes += 1

    // calculate one with the most vote
    copy.forEach((e, i) => {
      if(e.votes > copy[winnerQuote].votes){
        setWinner(i)
      }
    });

    setAnecdote(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected].quote}
      <br></br>
      <p>Votes : {anecdotes[selected].votes}</p>
      <button onClick={selectButton}>next anecdote</button>
      <button onClick={voteQuote}>vote</button>
      <h1>Winning quote</h1>
      <p>{anecdotes[winnerQuote].quote}</p>
      <p>Votes : {anecdotes[winnerQuote].votes}</p>
    </div>
  )
}

export default App
