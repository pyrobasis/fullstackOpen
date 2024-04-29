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
                <div key={course.id}>
                <Header courseourse={course.name} />
                <Content parts={course.parts} />
                </div>
            )
        })
      }
      </>
    )
  }
  
  export default Course 