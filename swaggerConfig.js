const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Book API',
      version: '1.0.0',
      description: 'A simple API for managing books',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
        description: 'Development server',
      },
    ],
  },
  apis: [path.resolve(__dirname, './src/pages/api/**/*.ts')], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
