const swaggerJsDoc = require('swagger-jsdoc');

// Configuración de Swagger
const swaggerConfig = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Idea Generator API',
      version: '1.0.0',
      description: 'API para generar ideas de proyectos'
    },
    servers: [{ url: `http://localhost:3001` }]
  },
  apis: ['src/routes/*.js'] // Rutas donde Swagger buscará las definiciones
});

module.exports = { swaggerConfig };
