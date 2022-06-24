// we have to tell our application to load our database url
// do this by checking if we are running in the production environment or not
// we don't want to load in our environment variable unless we are in our development environment 
if (process.env.NODE_ENV !== 'production') {
    // loads all variables from our .env file and it's going to download it into our process.env variable in our application ... process.env.DATABASE_URL
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
// install body parser to access input elements
const bodyParser = require('body-parser')

// this is where all the routers go
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// // importing mongoose and connecting to the database
// // inside the connect() we're passing a string for the url which comes from our environment variables
// const mongoose = require('mongoose')
// const dbURL = process.env.DATABASE_URL
// // we need to install env so we have process.env.DATABASE_URL available
// mongoose.connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true})
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log("Connected to Mongoose"))

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = "mongodb+srv://user:Pyi4BXVxwFNsBUUfj@cluster0.mf1ur.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
client.connect(err => {
  const collection = client.db("test").collection("devices")
})


// this is where all the routers are used
app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)