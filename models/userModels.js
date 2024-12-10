const mongoose = require('mongoose')
const { mainDB } = require('../config/db')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,  
        unique: true,   
    },
    password: {
        type: String,
        required: true,  
    },
    token: {
        type: String
    },
}, {
    timestamps: true,
})

module.exports = mainDB.model('User', userSchema)