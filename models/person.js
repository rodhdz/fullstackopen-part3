const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB', error.message)
    })
const personSchema = mongoose.Schema({
    name: { type: String, required: true, minLength: [3, "must be a least 3 characters"] },
    number: {
        type: String,
        required: true,
        validate: {
            validator: v => /^(?=.{8,}$)\d{2,3}-\d+$/.test(v),
            message: props => `${props.value} is not a valid phone number! Must have 2-3 digits, one dash and digits, with a length of at least 8 digits.`
        }
    },
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)