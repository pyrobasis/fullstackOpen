import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const Statistics = ({good, neutral, bad}) => {
    return (
    <>
      <p>all {good + neutral + bad}</p>
      <p>average {(good-bad)/(good+neutral+bad)}</p>
      <p>positive {(good)/(good+neutral+bad) * 100 } %</p>
    </>)    
  }

  const Button = (props) => {
    return <button onClick={props.handleClick}>{props.text}</button>
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='Good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='Bad' />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App