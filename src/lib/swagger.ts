import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book API',
      version: '1.0.0',
      description: 'A simple API for managing books',
    },
  },
  apis: [path.resolve(__dirname, '../pages/api/*.ts')], 
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
