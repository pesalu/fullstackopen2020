import React from 'react';

const Header = (props) => {
    return (
        <h2>
            {props.name}
        </h2>
    );

}

const Content = ({parts}) => {
  return parts.map((part,i) => <Part key={i} part={part} />);
}

const Part = ({part}) =>  {
    return (<p>
        {part.name} {part.exercises}
    </p>)
}

const Total = ({parts}) => {
    const summarizer = (initVal, currVal) => initVal + currVal.exercises;
    const totalExcercises = parts.reduce(summarizer, 0);
    return (
        <p><strong>Total of {totalExcercises} exercises</strong></p>
    )
}

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}

export default Course;