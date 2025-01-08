require('dotenv').config()
const express = require('express')
const app = express()
const connectToDatabase = require('./database')
app.use(express.json())

connectToDatabase()

app.listen(process.env.PORT, () =>{
    console.log("project has been started")
})

app.post('/authors', (req, res) =>{
    console.log(req.body)
    res.status(201).json({
        message: "my Api run"
    })
})