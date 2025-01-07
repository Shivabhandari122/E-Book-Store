const mongoose = require('mongoose')

function connectToDatabase(){
    mongoose.connect('mongodb+srv://qshiva906:whitehouse@cluster0.6ftcc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log('Database connected sucessfully')
}

module.exports = connectToDatabase