const express = require('express')
const router = express.Router()

// this is rendering the index.ejs file in the views foler
router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router