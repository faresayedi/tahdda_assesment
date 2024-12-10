const express = require('express')
const router = express.Router()
const {
    signIn,
    signUp,
    forgetPassword,
    updatePassword
} = require('../controllers/authController')

router.route('/sign_in').post(signIn)
router.route('/sign_up').post(signUp)
router.route('/forget_password').post(forgetPassword)
router.route('/update_password').post(updatePassword)

module.exports = router