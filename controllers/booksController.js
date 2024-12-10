const asyncHandler = require('express-async-handler')
const Joi = require('joi')
const Book = require('../models/bookModels')

// @route POST /api/books
// @access User
const addBook = asyncHandler (async (req, res) => {      
    
    //validate data
    const validationSchema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        publishedDate: Joi.string().required(),
        numberOfPages: Joi.number().required(),
    })
    await validationSchema.validateAsync(req.body);
    const {title, author, publishedDate, numberOfPages} = req.body;

    //test unique
    const exist = await Book.findOne({title})
    if(exist){
        res.status(400).json({data: 'Book already exist!' })
        throw new Error('Book already exist!') 
    }

    //test publishedDate format
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if(!dateRegex.test(publishedDate)){
        res.status(400).json({data: 'publishedDate should be on format : YYYY-MM-DD' })
        throw new Error('publishedDate should be on format : YYYY-MM-DD') 
    }

    //test numberOfPages
    if(numberOfPages <= 0){
        res.status(400).json({data: 'numberOfPages not valid!' })
        throw new Error('numberOfPages not valid!') 
    }

    try{
        const newBook = await Book.create({
            title, 
            author,
            publishedDate, 
            numberOfPages  
        })
    
        res.status(200).json({data: newBook })

    }catch(err){
        res.status(400).json({data: 'Not able to add book, please try again later!' })
        throw new Error('Not able to add book, please try again later!') 
    }

    
})

// @route GET /api/books
// @access User
const getAllBooks = asyncHandler (async (req, res) => {       

    //validate query
    const validationSchema = Joi.object({
        page: Joi.number().optional()
    })
    await validationSchema.validateAsync(req.query);
    let {page} = req.query;
    const perPage = 25;

    if(!page){
        page = 1;
    }

    try{
        const count = await Book.countDocuments();
        const books = await Book.find()
                                .limit(perPage)
                                .skip(perPage * (page - 1))
                                .sort({createdAt: -1})

        const resData = {
            books,
            pagination: {
                current: parseInt(page, 10),
                total: Math.ceil(count/perPage)
            }
        }                        

        res.status(200).json({data: resData })

    }catch(err){
        res.status(400).json({data: 'Not able to list books, please try again later!' })
        throw new Error('Not able to list books, please try again later!') 
    }

   
})

// @route GET /api/books/:id
// @access User
const getBook = asyncHandler (async (req, res) => {   
    
    //validate query
    const validationSchema = Joi.object({
        id: Joi.string().optional()
    })
    await validationSchema.validateAsync(req.params);
    const {id} = req.params;

    const book = await findBook(id, res)
    res.status(200).json({data: book })
    
})

// @route PUT /api/books/:id
// @access User
const editBook = asyncHandler (async (req, res) => {       

    //validate query
    const validationQuerySchema = Joi.object({
        id: Joi.string().optional()
    })
    await validationQuerySchema.validateAsync(req.params);
    const {id} = req.params;

    //validate data
    const validationBodySchema = Joi.object({
        title: Joi.string().optional(),
        author: Joi.string().optional(),
        publishedDate: Joi.string().optional(),
        numberOfPages: Joi.number().optional(),
    })
    await validationBodySchema.validateAsync(req.body);
    const {title, author, publishedDate, numberOfPages} = req.body;

    let book = await findBook(id, res)
    let update = {};

    if(title && book.title !== title){
        //test unique
        const exist = await Book.findOne({title})
        if(exist){
            res.status(400).json({data: 'Book already exist!' })
            throw new Error('Book already exist!') 
        }

        update.title = title
    }

    if(author && book.author !== author){
        update.author = author
    }

    if(publishedDate && book.publishedDate !== publishedDate){

        //test publishedDate format
        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if(!dateRegex.test(publishedDate)){
            res.status(400).json({data: 'publishedDate should be on format : YYYY-MM-DD' })
            throw new Error('publishedDate should be on format : YYYY-MM-DD') 
        }

        update.publishedDate = publishedDate
    }

    if(numberOfPages && book.numberOfPages !== numberOfPages){

        //test numberOfPages
        if(numberOfPages <= 0){
            res.status(400).json({data: 'numberOfPages not valid!' })
            throw new Error('numberOfPages not valid!') 
        }

        update.numberOfPages = numberOfPages
    }

    try{

        if(Object.keys(update).length > 0){
            const updateBook = { $set: update };        
            await Book.updateOne(book, updateBook);   
            book = await findBook(id, res)
        }
         
        res.status(200).json({data: book })

    }catch(err){
        res.status(400).json({data: `Not able to edit book : ${book.title}, please try again later!`})
        throw new Error(`Not able to edit book : ${book.title}, please try again later!`) 
    }

})

// @route DELETE /api/books/:id
// @access User
const deleteBook = asyncHandler (async (req, res) => {       
    //validate query
    const validationSchema = Joi.object({
        id: Joi.string().optional()
    })
    await validationSchema.validateAsync(req.params);
    const {id} = req.params;

    const book = await findBook(id, res)

    try{
        await Book.deleteOne(book)
        res.status(200).json({data: `Book : ${book.title}, deleted with success` })
    }catch(err){
        res.status(400).json({data: `Not able to delete book : ${book.title}, please try again later!`})
        throw new Error(`Not delete to edit book : ${book.title}, please try again later!`) 
    }

   
})

async function findBook(id, res){
    try{
        return await Book.findById(id);
    }catch(err){
        res.status(400).json({data: 'Book not found!' })
        throw new Error('Book not found!') 
    }
}

module.exports = {
    addBook,
    getAllBooks,
    getBook,
    editBook,
    deleteBook
}