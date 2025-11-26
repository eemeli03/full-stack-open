const Header = ({header}) => {
  return (
    <h1>{header}</h1>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>{name} {exercises} </p>
  )
}

const Content = ({ parts }) => {
  const sum = parts.reduce((sum, current) => sum + current.exercises, 0);
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      ))}
      <p style={{fontWeight: "bold"}}>total of {sum} exercises</p>
    </div>
  )
}

export const Course = () => {
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

    return (
        <div>
            {courses.map(course => (
            <div key={course.id}>
                <Header header={course.name}/>
                <Content parts={course.parts}></Content>
            </div>
            ))}
        </div>
  )
}
