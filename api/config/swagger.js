const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0', 
        info: {
            title: 'TAHDDA API Documentation',
            version: '1.0.0',
            description: 'API documentation for the Assesment project',
        },
        servers: [
            {
                url: 'http://localhost:4200', 
            },
        ],
    },
    apis: ['./docs/*.js', './routes/*.js'], 
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
module.exports = swaggerSpec;
