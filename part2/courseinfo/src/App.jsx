const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <h4>Total number of exercises {sum}</h4>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  let sum = 0;
  parts.forEach(part => sum = sum + part.exercises)
  
  return (
    <>
      {
        parts.map(part => <Part key={part.id} part={part} />)
      }
      <Total sum={sum} />
    </>
  )
}


const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App