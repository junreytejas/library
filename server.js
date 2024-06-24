const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig'); 

const app = express();
app.use(cors());
// Serve Swagger UI at /
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server at port 3002
app.listen(3002, () => {
  console.log('Server is running on http://localhost:3002');
});
