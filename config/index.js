const dotenv = require('dotenv').config();
const port = process.env.PORT || 8080;

const swaggerOptions = {
  swaggerDefinition: {
    title: 'Octane API',
    version: '1.0.0',
    description: 'This is a REST API to serve the Octane ecommerce app',
  },
  host: `localhost:${port}/api/`,
  basePath: '/v1',
  produces: ['application/json'],
  schemes: ['http', 'https'],
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: 'Local Sever',
    },
  ],
  basedir: __dirname,
  files: ['../routes/*.js'],
};

const config = {
  swaggerOptions,
  port,
  secret: process.env.SECRET,
  database: {
    url: process.env.MONGO_URL,
  },
};

module.exports = config;
