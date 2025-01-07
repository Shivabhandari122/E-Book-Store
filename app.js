const express = require('express')
const connectToDatabase = require('./database')
const app = express()

connectToDatabase()

