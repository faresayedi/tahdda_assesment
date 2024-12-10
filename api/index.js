const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.APP_PORT
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize')
const {errorHandler} = require('./middlewares/errorsMiddleware')
const { expressCspHeader, SELF, NONE } = require('express-csp-header');
const hsts = require('hsts')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger'); // Path to your Swagger configuration

//init pp
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(errorHandler);

app.use(expressCspHeader({
    directives: {
        'default-src': [SELF],
        'object-src': [NONE],
        'require-trusted-types-for': 'script'
    }
}));
  
app.use(hsts({
    maxAge: 31536000,       
    includeSubDomains: true, 
    preload: true
}));
  
app.set('trust proxy', true);

app.use('/auth', require('./routes/authRoute'));
app.use('/api', require('./routes/apiRoute'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('*', (req, res) => {
  return res.status(404).json({
    status: 404,
    message: '404 Not Found !',
  });
});

// start app
app.listen(port, ()=>{
    console.log('app started and listening to port :' + port)
})