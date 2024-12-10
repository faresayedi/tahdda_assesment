const mongoose = require('mongoose')


const mainDB = mongoose.createConnection(process.env.DB_URI, {
    connectTimeoutMS: process.env.MAX_MONGO_TIMEOUT, 
    retryReads: false, 
    socketTimeoutMS: process.env.MAX_MONGO_TIMEOUT, 
    maxIdleTimeMS: process.env.MAX_MONGO_TIMEOUT
});

module.exports = {
    mainDB
}