import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const StatisticLine = ({value, text}) => {
    return <p>{text} {value}</p>
  }

  const Statistics = ({good, neutral, bad}) => {
    <h1>statistics</h1>

    if(good+neutral+bad === 0){
      return <><p>No feedback given</p></>
    }
    
    return (
      <>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine text="average" value={(good-bad)/(good+neutral+bad)} />
        <StatisticLine text="positive" value={(good)/(good+neutral+bad) * 100 + '%'} />
      </>
    )    
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App