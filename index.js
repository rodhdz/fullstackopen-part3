require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person.js')
const app = express()
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data '))

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
    Person.countDocuments({})
        .then(count => {
            const now = new Date();
            const message = `
            <!DOCTYPE html>
            <html>
              <head><title>Phonebook Info</title></head>
              <body>
                <p>Phonebook has info for ${count} people</p>
                <p>${now}</p>
              </body>
            </html>`;
            response.send(message);
        })
        .catch(error => {
            console.error('Error counting documents', error.message);
            response.status(500).send('Error retrieving info');
        });
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })

})

app.post('/api/persons', (request, response) => {
    const body = request.body
    let isPerson

    if (!body.name) {
        return response.status(400).json({
            error: "name missing",
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: "number missing",
        })
    }

    Person.find({ name: body.name })
        .then(result => {
            result.forEach(person => {
                console.log("Se encontró a la persona: ", person.name)
                isPerson = true
            })
            console.log("Existe la persona ", isPerson)
        })
        .then(result => {
            if (!isPerson) {
                const person = new Person({
                    "name": body.name,
                    "number": body.number
                })
                person.save().then(savedPerson => {
                    response.json(savedPerson)
                })
            } else {
                return response.status(400).json({
                    error: "name must be unique",
                })
            }
        })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => { response.json(person) })
        .catch(error => { response.status(404).end() })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(person => {
            response.status(204).end()
        })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})