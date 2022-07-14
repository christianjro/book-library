const express = require('express')
const router = express.Router()
// this imports the author model and allows us to create a new author
const Author = require('../models/author')

// All Authors Route
// when the url is /authors, it renders the authors/index file from the views folder
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '' ) {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try { 
        const authors = await Author.find(searchOptions)
        // whatever is inside the {} gets sent to the user
        res.render('authors/index', { 
            authors: authors, 
            searchOptions: req.query
        })
    } catch { 
        res.redirect('/')
    }
})

// New Author Route (displaying the form)
// when the url is /authors/new, it renders the authors/new file from the views folder
router.get('/new', (req, res) => {
    // the variables within the {} are being passed to the ejs file
    res.render('authors/new', { author: new Author() })
})

// Creating a New Author Route
router.post('/', async (req, res) => {
    const author = new Author({
        // parameters that we're going to use
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect('authors')
    } catch {
        res.render('authors/new', {
            author: author, 
            errorMessage: 'Error creating Author'
        })
    }
})

module.exports = router