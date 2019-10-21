import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>
            {props.name}
        </h1>
    );

}

const Button = ({onClick, text}) => (
    <button onClick={onClick} >{text}</button>
  )

const App = () => {
  const title = 'Unicafe palaute'

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <Header name={title} />
      <span>
      <Button onClick={handleGood} text='Good' />
      <Button onClick={handleNeutral} text='Neutral' />
      <Button onClick={handleBad} text='Bad' />
      </span>
      <br/>
      <br/>
      <Header name='Statistics' />
      <div>Good: {good}</div>
      <div>Neutral: {neutral}</div>
      <div>Bad: {bad}</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))