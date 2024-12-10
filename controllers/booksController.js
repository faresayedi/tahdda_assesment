const asyncHandler = require('express-async-handler')
const Joi = require('joi')
const Book = require('../models/bookModels')

// @route POST /api/books
// @access User
const addBook = asyncHandler (async (req, res) => {       

    res.status(200).json({data: 'addBook' })
})

// @route GET /api/books
// @access User
const getAllBooks = asyncHandler (async (req, res) => {       

    res.status(200).json({data: 'getAllBooks' })
})

// @route GET /api/books/:id
// @access User
const getBook = asyncHandler (async (req, res) => {       

    res.status(200).json({data: 'getBook' })
})

// @route PUT /api/books/:id
// @access User
const editBook = asyncHandler (async (req, res) => {       

    res.status(200).json({data: 'editBook' })
})

// @route DELETE /api/books/:id
// @access User
const deleteBook = asyncHandler (async (req, res) => {       

    res.status(200).json({data: 'deleteBook' })
})

module.exports = {
    addBook,
    getAllBooks,
    getBook,
    editBook,
    deleteBook
}