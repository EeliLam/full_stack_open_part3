const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)


//const password = process.argv[2]

//const url = 
    //`mongodb+srv://fullstackopen:${password}@cluster0-6gp12.mongodb.net/phonebook_app?retryWrites=true&w=majority`

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log('connected to MongoDB'))
    .catch(error => console.log('error connecting to MongoDB:', error.message))

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)