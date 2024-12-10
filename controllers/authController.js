const asyncHandler = require('express-async-handler')
const Joi = require('joi')
const User = require('../models/userModels')

// @route POST /auth/sign_in
// @access Public
const signIn = asyncHandler (async (req, res) => {       

    res.status(200).json({data: 'signIn' })
})

// @route POST /auth/sign_up
// @access Public
const signUp = asyncHandler (async (req, res) => {       

    res.status(200).json({data: 'signUp' })
})

// @route POST /auth/forget_password
// @access Public
const forgetPassword = asyncHandler (async (req, res) => {       

    res.status(200).json({data: 'forgetPassword' })
})

// @route POST /auth/update_password
// @access Public
const updatePassword = asyncHandler (async (req, res) => {       

    res.status(200).json({data: 'updatePassword' })
})

module.exports = {
    signIn,
    signUp,
    forgetPassword,
    updatePassword
}