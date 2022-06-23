const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }
})

// this is the name of the table within the database
module.exports = mongoose.model('Author', authorSchema)