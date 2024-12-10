const express = require('express')
const router = express.Router()
const {
    addBook,
    getAllBooks,
    getBook,
    editBook,
    deleteBook
} = require('../controllers/booksController')

router.route('/books').post(addBook)
router.route('/books').get(getAllBooks)
router.route('/books/:id').get(getBook)
router.route('/books/:id').put(editBook)
router.route('/books/:id').delete(deleteBook)

module.exports = router