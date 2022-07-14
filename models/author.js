const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }
})

// this is the schema for the database
module.exports = mongoose.model('Author', authorSchema)