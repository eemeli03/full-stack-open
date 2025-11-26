const Header = (props) => {
  const course = props.course
  return (
    <h1>{course}</h1>
  )
}

const Part = (props) => {
  const content = props.content
  const exercises = props.exercises
  return (
    <p>{content} {exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part content={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part content={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part content={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App