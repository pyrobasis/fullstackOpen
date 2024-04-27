const Header = ({props}) => {
  return(
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Content = ({props}) => {
  const Part = ({name, exercise}) => {
    return (
        <p>
          {name} {exercise}
        </p>
    )
  }

  return(
    <>
      <Part name={props.content[0].name} exercise={props.content[0].exercises} />
      <Part name={props.content[1].name} exercise={props.content[1].exercises} />
      <Part name={props.content[2].name} exercise={props.content[2].exercises} />
    </>
  )
}

const Total = ({props}) => {
  return(
        <>
          <p>Number of exercises {props.content[0].exercises+props.content[1].exercises+props.content[2].exercises}</p>
        </>
  )
}

const App = () => {
  const course = { name: 'Half Stack app development',
                  content : [
                      { name: 'Fundamentals of React',
                        exercises: 10
                      },
                      { name : 'Passing data using props', 
                        exercises: 7
                      },
                      { name : 'State of a component',
                        exercises : 14}
                  ]
                }

  return (
    
    <div>
      <Header props={course}/>
      <Content props={course}/>
      <Total props={course} />
    </div>
  )
}

export default App
