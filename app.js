require('dotenv').config()
const express = require('express')
const app = express()
const connectToDatabase = require('./database')
const bookRout = require('./book/bookRout')
app.use(express.json())

connectToDatabase()
app.listen(process.env.PORT, () =>{
    console.log("project has been started")
})
//rout for books
app.use('/', bookRout)

//checking project is working or not
app.get('/', (req, res) =>{
    res.status(200).json({
        message: "bookstore project Home page"
    })
})

app.use(express.static('./storage')) 
