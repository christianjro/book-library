const express = require('express')
const router = express.Router()

// All Authors Route
// when the url is /authors, it renders the authors/index file from the views folder
router.get('/', (req, res) => {
    res.render('authors/index')
})

// New Author Route (displaying the form)
// when the url is /authors/new, it renders the authors/new file from the views folder
router.get('/new', (req, res) => {
    res.render('authors/new')
})

// Creatining a New Author Route
router.post('/', (req, res) => {
    res.send('Create')
})

module.exports = router