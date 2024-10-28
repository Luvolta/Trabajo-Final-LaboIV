// swaggerOptions.js
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Idea Generator',
            version: '1.0.0',
            description: 'API para generar ideas de proyectos.',
            contact: {
                name: 'Tu Nombre',
                url: 'http://tusitio.com',
                email: 'tucorreo@ejemplo.com',
            },
            servers: [
                {
                    url: 'http://localhost:3001/api',
                },
            ],
        },
    },
    apis: ['./routes/*.js'], // Ruta a los archivos donde están las operaciones Swagger
};

module.exports = swaggerJsDoc(swaggerOptions);
