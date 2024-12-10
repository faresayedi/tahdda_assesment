const express = require('express')
const router = express.Router()
const {
    signIn,
    signUp,
    activateAccount,
    forgetPassword,
    updatePassword,
    refreshToken
} = require('../controllers/authController')

const {protect} = require('../middlewares/authMiddleware')

router.route('/sign_in').post(signIn)
router.route('/sign_up').post(signUp)
router.route('/activate/:token').get(activateAccount)
router.route('/forget_password').post(forgetPassword)
router.route('/update_password').post(updatePassword)
router.route('/activate/:token').get(activateAccount)
router.route('/refresh_token').get(protect, refreshToken)

module.exports = router