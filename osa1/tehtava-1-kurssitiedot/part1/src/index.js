import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>
            {props.name}
        </h1>
    );

}

const Content = (props) => {
    return (
        <>
            <Part part={props.parts.part1} />
            <Part part={props.parts.part2} />
            <Part part={props.parts.part3} />
        </>
    );
}

const Part = (props) =>  {
    return (<p>
        {props.part.name} {props.part.exercises}
    </p>)
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.numberOfExcercises.exercises1 + props.numberOfExcercises.exercises2 + props.numberOfExcercises.exercises3}</p>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = {
      part1: {
        name: part1,
        exercises: exercises1,
      },
      part2: {
        name: part2,
        exercises: exercises2,
      },
      part3: {
        name: part3,
        exercises: exercises3,
      },
  }

  const exerciseCount = {exercises1: exercises1, exercises2: exercises2, exercises3: exercises3,}

  return (
    <div>
      <Header name={course} />
      <Content parts={parts} />
      <Total numberOfExcercises={exerciseCount} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))