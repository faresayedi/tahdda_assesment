const express = require('express')
const router = express.Router()
const {
    addBook,
    getAllBooks,
    getBook,
    editBook,
    deleteBook
} = require('../controllers/booksController')

const {protect} = require('../middlewares/authMiddleware')

router.route('/books').post(protect, addBook)
router.route('/books').get(protect, getAllBooks)
router.route('/books/:id').get(protect, getBook)
router.route('/books/:id').put(protect, editBook)
router.route('/books/:id').delete(protect, deleteBook)

module.exports = router