const express = require("express")
const cors = require("cors")
let morgan = require('morgan')

const app = express()

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body' ))
app.use(express.json())

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (!person) { res.status(404).json({"error": "person does not exist"}) }

  res.status(200).json(person)
})

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body
  const personExists = persons.find(p => p.name === name)

  if (!name || !number) {
    return res.status(400).json({
      "error": "Check if all input are correct"
    })
  }

  if (personExists) {
    return res.status(400).json({
      "error": "Name must be  unique"
    })
  }


  const id = parseInt(Math.random() * 100000);
  const person = { id, name, number }

  res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

app.get("/info", (req, res) => {
  // console.log(req.headers)
  res.send(`<p>Phonebook has info for ${persons.length} people<br /> ${new Date()}</p>`)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`listening for connection on PORT ${PORT}`)
})