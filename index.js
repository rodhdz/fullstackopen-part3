const express = require('express')
const app = express()
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

app.get('/info', (request, response) => {
    const now = Date()
    const message = `
    <!DOCTYPE html>
    <html>
      <head><title>My HTML Response</title></head>
      <body>
        <p> Phonebook has info for ${persons.length} people</p>
        <p>${now}</p>
      </body>
    </html>`
    response.send(message)
})

app.get('/api/persons', (request, response) => {
    console.log(persons)
    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})