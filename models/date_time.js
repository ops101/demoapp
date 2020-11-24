const mongoose = require('mongoose')

const dateSchema = new mongoose.Schema({
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('datetime', dateSchema)
