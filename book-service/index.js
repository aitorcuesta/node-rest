const config = require('./config/config')
const express = require('express')

const app = express()

// Middleware config
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Beware, You must make sure that you define all configurations BEFORE defining routes 
// Router config
const router = require('./api-routes/book-routes')
app.use('/books', router)

//Set up mongoose connection
const mongoose = require('mongoose')
mongoose.connect(config.mongourl, { useUnifiedTopology: true, useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('MongoDB database connection established successfully')
})

const server = app.listen(config.port, () => console.log(`Book service started http://localhost:${config.port}`))