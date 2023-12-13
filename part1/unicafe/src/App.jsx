import { useState } from 'react'

const Button = ({ onClick, text }) =>
  <button onClick={onClick}>{text}</button>

const StaticLine = ({ text, value }) =>
  <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) {
    return (
      <div>No feedback given</div>
    )
  } else {
    return (
      <div>
        <table>
          <tbody>
            <StaticLine text='good' value={good} />
            <StaticLine text='neutral' value={neutral} />
            <StaticLine text='bad' value={bad} />
            <StaticLine text='all' value={total} />
            <StaticLine text='average' value={average} />
            <StaticLine text='positive' value={positive} />
          </tbody>
        </table>
      </div >
    )
  }
}

// Note: currently about to start question 1.7
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const calculateAverage = (good, bad, total) =>
    (good + bad * -1) / total

  const calculatePositive = (good, total) => {
    const formatter = new Intl.NumberFormat('en-UK', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 14,
    })
    return formatter.format(good / total)
  }

  const handleGood = () => {
    const newGood = good + 1
    const newTotal = total + 1
    setGood(newGood)
    setTotal(newTotal)
    setAverage(calculateAverage(newGood, bad, newTotal))
    setPositive(calculatePositive(newGood, newTotal))
  }

  const handleNeutral = () => {
    const newTotal = total + 1
    setNeutral(neutral + 1)
    setTotal(newTotal)
    setAverage(calculateAverage(good, bad, newTotal))
    setPositive(calculatePositive(good, newTotal))
  }

  const handleBad = () => {
    const newBad = bad + 1
    const newTotal = total + 1
    setBad(newBad)
    setTotal(newTotal)
    setAverage(calculateAverage(good, newBad, newTotal))
    setPositive(calculatePositive(good, newTotal))
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div >
  )
}

export default App
