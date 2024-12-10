const mongoose = require('mongoose')
const { mainDB } = require('../config/db')

const bookSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,  
    },
    title: {
        type: String,
        required: true,  
        unique: true,   
    },
    author: {
        type: String,
        required: true,  
    },
    publishedDate: {
        type: String,
        required: true,  
    },
    numberOfPages: {
        type: String,
        required: true,  
    },
}, {
    timestamps: true,
})

module.exports = mainDB.model('Book', bookSchema)