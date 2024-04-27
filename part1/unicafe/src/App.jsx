import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const StatisticLine = ({value, text}) => {
    return (
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
          )
  }

  const Statistics = ({good, neutral, bad}) => {

    if(good+neutral+bad === 0){
      return <>
              <h1>statistics</h1>
              <p>No feedback given</p>
            </>
    }
    
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={good + neutral + bad} />
            <StatisticLine text="average" value={((good-bad)/(good+neutral+bad)).toFixed(1)} />
            <StatisticLine text="positive" value={((good)/(good+neutral+bad) * 100).toFixed(1) + '%'} />
          </tbody>
        </table>
      </>
    )    
  }

  const Button = (props) => {
    return <button onClick={props.handleClick}>{props.text}</button>
  }
  
  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='Good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App