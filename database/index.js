const mongoose = require('mongoose')

function connectToDatabase(){
    mongoose.connect(process.env.MONGODB_URI)
    console.log('Database connected sucessfully')
}

module.exports = connectToDatabase