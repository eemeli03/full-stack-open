const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('dist'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
]

app.get("/api/persons", (request, response) => {
    response.json(persons)
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        return response.status(404).json({ error: `No person found with id ${id}` })
    }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const idExist = persons.some(p => p.id === id)

  if (!idExist) {
    return response.status(404).json({ error: `id ${id} cannot be found` })
  }

  persons = persons.filter((person) => person.id !== id)
  return response.status(204).end()
})

app.post("/api/persons/", (request, response) => {
  const {name, number} = request.body
  const personExist = persons.find(p => p.name === name)

  if (!name || !number) {
    return response.status(400).json({ error: "name or number not included"})
  }

  if (personExist) {
    return response.status(409).json({ error: "name must be unique" })
  } else {
      const person = {
        id: Math.floor(Math.random() * 1000),
        name: name,
        number: number
      }
      persons.push(person)
      return response.status(201).json(person)
    }
})

app.get("/info", (request, response) => {
    const date = new Date()
    response.send(`Phonebook has info for ${persons.length} people <br>
    ${date} `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})