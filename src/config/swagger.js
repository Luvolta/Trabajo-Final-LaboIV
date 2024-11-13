const swaggerJsDoc = require('swagger-jsdoc');
const swaggerConfig = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Idea Generator API',
      version: '1.0.0',
      description: 'API para generar ideas de proyectos'
    },
    servers: [{ url: `http://localhost:3001` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['src/routes/*.js'] // Ruta donde Swagger buscará las definiciones
});

module.exports = { swaggerConfig };