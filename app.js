require('dotenv').config()
const express = require('express')
const app = express()
const connectToDatabase = require('./database')
const bookRout = require('./book/bookRout')
const cors = require('cors')
app.use(express.json())

app.use(cors(
    {
        origin: "http://localhost:5173"
    }
))

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
