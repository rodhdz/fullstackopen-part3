const mongoose = require('mongoose')
let isConsult

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
} else if (process.argv.length < 4) {
    isConsult = true
} else if (process.argv.length < 5) {
    console.log('either name or number is missing')
    process.exit(1)
} else {
    isConsult = false
}
const password = process.argv[2]

const url =
    `mongodb+srv://rodhdz_db_user:${password}@cluster0.siu9wgl.mongodb.net/persons?
retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (isConsult) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    person.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}