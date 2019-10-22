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
  );

const Statistic = ({variableName, value}) => (<div>{variableName}: {value}</div>);

const Statistics = ({good, neutral, bad}) => {
  const all = () => good + neutral + bad;

  const average = () => {
    if (all() === 0) return 0;
    return (good - 1*bad) / (good + neutral + bad);
  }

  const positive = () => {
    if (all() === 0) return 0;
    return good / all();
  }

  if (all() === 0) return (<><Header name='Statistics'></Header><div>No feedback given!</div></>);

  return (
    <>
    <Header name='Statistics'></Header>
    <Statistic variableName='Good' value={good}></Statistic>
    <Statistic variableName='Neutral' value={neutral}></Statistic>
    <Statistic variableName='Bad' value={bad}></Statistic>
    <Statistic variableName='All' value={all()}></Statistic>
    <Statistic variableName='Average' value={average()}></Statistic>
    <Statistic variableName='Positive' value={positive()}></Statistic>
    </>
  );
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))