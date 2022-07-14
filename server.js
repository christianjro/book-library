// we have to tell our application to load our database uri
// do this by checking if we are running in the production environment or not
// we don't want to load in our environment variable unless we are in our development environment 
if (process.env.NODE_ENV !== 'production') {
    // loads all variables from our .env file and it's going to download it into our process.env variable in our application ... process.env.DATABASE_URI
    require('dotenv').config({ path: '.env' })
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

// importing mongoose and connecting to the database
// inside the connect() we're passing a string for the url which comes from our environment variables
const mongoose = require('mongoose')
// we need to install env so we have process.env.DATABASE_URL available
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('MongoDB Connected...')
    })
    .catch(err => console.log(err))

    
// this is where all the routers are used
app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)