const asyncHandler = require('express-async-handler')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const fs = require('fs')
const dataService = require('../utility/dataService')

const User = require('../models/userModels')

//const crypto = require('crypto')
//const path = require('path')

// @route POST /auth/sign_in
// @access Public
const signIn = asyncHandler (async (req, res) => { 
    
    //validate data
    const validationSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    await validationSchema.validateAsync(req.body);
    const {email, password} = req.body;

    //test unique
    const targetUser = await User.findOne({email})
    if(!targetUser){
        res.status(400).json({data: 'Email or password not valid!' })
        throw new Error('Email or password not valid!') 
    }

    if(!targetUser.active){
        res.status(400).json({data: ' Please verify your email to activate your account!' })
        throw new Error('Please verify your email to activate your account!') 
    }

    //verif password
    if(await bcrypt.compare(password, targetUser.password)){
     
        const token = await generateToken(targetUser._id, targetUser.email)
        res.status(200).json({data: token })
        
    }else{        
        res.status(400).json({data: 'Email or password not valid!' })
        throw new Error('Email or password not valid!') 
    }  

})

// @route POST /auth/sign_up
// @access Public
const signUp = asyncHandler (async (req, res) => {     
    
    //validate data
    const validationSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    await validationSchema.validateAsync(req.body);
    const {email, password} = req.body;

    //test unique
    const exist = await User.findOne({email})
    if(exist){
        res.status(400).json({data: 'User already exist!' })
        throw new Error('User already exist!') 
    }
    
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = uuid.v4();

    try{
        await User.create({
            email, 
            password: hashedPassword,
            token, 
            active: false  
        })
    
        const uri = process.env.API_URI + '/auth/activate/' + token;
        dataService.sendMail(email, 'Validate account', `Thank you for joining us! Please activate your account using this link : ${uri}`)

        res.status(200).json({data: 'Thank you for joining us! Please verify your email to activate your account' })

    }catch(err){
        res.status(400).json({data: 'Not able to signUp, please try again later!' })
        throw new Error('Not able to signUp, please try again later!') 
    }

    
})

// @route GET /auth/activate/:token
// @access Public
const activateAccount = asyncHandler (async (req, res) => {   
    
    //validate query
    const validationSchema = Joi.object({
        token: Joi.string().optional()
    })
    await validationSchema.validateAsync(req.params);
    const {token} = req.params;

    //test unique
    const targetUser = await User.findOne({token})
    if(!targetUser){
       res.status(400).json({data: 'Not able to activate, please try again later!' })
       throw new Error('Not able to activate, please try again later!') 
    }

    

    try{

        const updateUser = { $set: {active: true} };        
        await User.updateOne(targetUser, updateUser);
        res.status(200).json({data: 'User activated with success' })

    }catch(err){
        res.status(400).json({data: 'Not able to activate, please try again later!' })
        throw new Error('Not able to activate, please try again later!') 
    }
    
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

// @route GET /auth/refresh_token
// @access Public
const refreshToken = asyncHandler (async (req, res) => {       

    res.status(200).json({data: 'refreshToken' })
})

// @route GET /auth/init_keys
// @access FARES
const initKeys = asyncHandler (async (req, res) => {
    const keysDir = path.join('./jwt_keys');
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048, // Length of the RSA key in bits
        publicKeyEncoding: {
            type: 'spki',  // X.509 Subject Public Key Info format
            format: 'pem'  // Base64 encoded format
        },
        privateKeyEncoding: {
            type: 'pkcs8',  // PKCS #8 format
            format: 'pem',
            cipher: 'aes-256-cbc',  // Optional: you can add a cipher for encrypting the private key
            passphrase: process.env.JWT_SECRET  // Password to protect private key (optional)
        }
    });

    // Save the keys to the folder
    fs.writeFileSync(path.join(keysDir, 'jwtRS256_public.pem'), publicKey);
    fs.writeFileSync(path.join(keysDir, 'jwtRS256_private.pem'), privateKey);

    res.status(200).json({data: 'ok'})
})

// @desc intern
const generateToken = async (id, email) => {
    const JWT_PRIVATE_KEY = fs.readFileSync('./jwt_keys/jwtRS256_private.pem', 'utf8');

    let options = {
        issuer: 'TAHDDA',
        algorithm: 'RS256',
        expiresIn: process.env.JWT_TIMEOUT,
    };

    return jwt.sign(
        {id, email},
        { key: JWT_PRIVATE_KEY.replace(/\\n/gm, '\n'), passphrase: process.env.JWT_SECRET },
        options
    )
}

module.exports = {
    signIn,
    signUp,
    activateAccount,
    forgetPassword,
    updatePassword,
    refreshToken
}