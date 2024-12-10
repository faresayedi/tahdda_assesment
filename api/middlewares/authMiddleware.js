const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const protect = asyncHandler( async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //extract token
            token = req.headers.authorization.split(' ')[1]
            const JWT_PUBLIC_KEY = fs.readFileSync('./jwt_keys/jwtRS256_public.pem', 'utf8');  
            
            let options = {
                issuer: 'TAHDDA',
                algorithm: 'RS256',
                expiresIn: process.env.JWT_TIMEOUT,
            };
           
            const decoded = jwt.verify(token, JWT_PUBLIC_KEY.replace(/\\n/gm, '\n'), options);
          
            // Get user from the token
            req.user = decoded
                
            next()
          

        } catch (error) {
            res.status(401).json({ message: 'Not authorized' });
            throw new Error('Not authorized')
        }
    }else{
        res.status(401).json({ message: 'Not authorized' });
        throw new Error('Not authorized')
    }

    if(!token){
        res.status(401).json({ message: 'Not authorized' });
        throw new Error('Not authorized')
    }

})


module.exports = {
    protect
}