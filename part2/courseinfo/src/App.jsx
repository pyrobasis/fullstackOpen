const Header = ({ course }) => {

  return <h1>{course}</h1>
}

const Total = ({sum}) => <h4>Total number of exercises {sum}</h4>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  
  return (
    <>
      {
        parts.map(part => <Part key={part.id} part={part} />)
      }
      <Total sum={parts.reduce((num, current) => num + current.exercises, 0)} />
    </>
  )
}


const Course = ({courses}) => {
  return (
    <>
    {
      courses.map(course => {
        // console.log(course)
          return (
            <div>
              <Header key={course.id} course={course.name} />
              <Content parts={course.parts} />
            </div>
          )
      })
    }
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
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
  ]

  return <Course courses={courses} />
}

export default App