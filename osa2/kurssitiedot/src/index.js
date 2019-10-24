import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

const MainTitle = ({name}) => <h1>{name}</h1>;

const Courses = ({courses}) => courses.map( course => <Course key={course.id} course={course} /> );

const App = () => {
  const course1 = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
    ]
  };
  const course2 = {
    id: 2,
    name: 'Node.js',
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }

  const courses = [course1, course2];

  const curriculumName = 'Web development curriculum';

  return (
    <div>
      <MainTitle name={curriculumName} />
      <Courses courses={courses}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))